import configure from './sparkline/configure';
import addCanvas from './util/addCanvas';
import structureData from './sparkline/structureData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import plugins from './sparkline/plugins';
import getScales from './sparkline/getScales';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
import updateData from './sparkline/updateData';
import updateConfig from './sparkline/updateConfig';
import updateOption from './sparkline/updateOption';

/**
 * Generate a scatter plot built with Chart.js.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 *
 * @returns {Object} Chart.js chart object
 */
export default function sparkline(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _parameters_ = []
) {
    // Update config.
    const config = configure(_config_, _data_, _parameters_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        layout: {
            padding: {
                right: 50,
            },
        },
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: plugins(config, datasets[0].data),
        scales: getScales(config, datasets[0].data),
    };

    const chart = new Chart(canvas, {
        data: {
            labels: datasets.labels,
            datasets,
            config,
        },
        options,
        //plugins: [ChartDataLabels],
    });

    canvas.chart = chart;

    chart.helpers = {
        updateData,
        //updateConfig,
        //updateOption,
    };

    return chart;
}
