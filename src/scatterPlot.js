import configure from './scatterPlot/configure';
import addCanvas from './util/addCanvas';
import structureData from './scatterPlot/structureData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import plugins from './scatterPlot/plugins';
import getScales from './scatterPlot/getScales';
import displayWhiteBackground from './util/displayWhiteBackground';

import Chart from 'chart.js/auto';
import updateData from './scatterPlot/updateData';
import updateConfig from './scatterPlot/updateConfig';
import updateOption from './scatterPlot/updateOption';
import triggerTooltip from './util/triggerTooltip';

/**
 * Generate a scatter plot built with Chart.js.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data plotted as a line representing _bounds_
 *
 * @returns {Object} Chart.js chart object
 */
export default function scatterPlot(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _bounds_ = null
) {
    // Update config.
    const config = configure(_config_, _data_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config, _bounds_);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        interaction: {
            mode: 'point',
        },
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: plugins(config),
        scales: getScales(config),
    };

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
        },
        options,
        plugins: [
            displayWhiteBackground()
        ],
    });

    canvas.chart = chart;

    chart.helpers = {
        updateData,
        updateConfig,
        updateOption,
        //triggerTooltip,
    };

    triggerTooltip(chart);

    return chart;
}
