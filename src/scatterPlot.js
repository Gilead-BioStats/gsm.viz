import Chart from 'chart.js/auto';
import addCanvas from './util/addCanvas';
import configure from './scatterPlot/configure';
import structureData from './scatterPlot/structureData';
import onHover from './scatterPlot/onHover';
import onClick from './scatterPlot/onClick';
import definePlugins from './scatterPlot/definePlugins';
import getScales from './scatterPlot/getScales';
import updateData from './scatterPlot/updateData';
import updateConfig from './scatterPlot/updateConfig';
import updateOption from './scatterPlot/updateOption';

/**
 * Generate a scatter plot built with Chart.js.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} bounds - optional auxiliary data plotted as a line representing bounds
 *
 * @returns {Object} Chart.js chart object
 */
export default function scatterPlot(
    _element_,
    _data_,
    _config_ = {},
    bounds = null
) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config, bounds);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        onHover,
        onClick,
        plugins: definePlugins(config),
        scales: getScales(config),
    };

    config.hoverEvent = new Event('hover-event');
    canvas.addEventListener(
        'hover-event',
        (event) => {
            const pointDatum = event.data;
            config.hoverCallback(pointDatum);
            return pointDatum;
        },
        false
    );

    config.clickEvent = new Event('click-event');
    canvas.addEventListener(
        'click-event',
        (event) => {
            const pointDatum = event.data;
            config.clickCallback(pointDatum);
            return pointDatum;
        },
        false
    );

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
        },
        options,
    });

    chart.helpers = {
        updateData: updateData,
        updateConfig: updateConfig,
        updateOption: updateOption,
    };

    return chart;
}
