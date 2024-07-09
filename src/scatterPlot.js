// Chart.js
import Chart from 'chart.js/auto';

// check inputs > configure > add canvas, structure data
import checkInputs from './scatterPlot/checkInputs.js';
import configure from './scatterPlot/configure.js';
import addCanvas from './util/addCanvas.js';
import structureGroupMetadata from './util/structureGroupMetadata.js';
import structureData from './scatterPlot/structureData.js';

// Chart.js options
import onHover from './util/onHover.js';
import onClick from './util/onClick.js';
import getPlugins from './scatterPlot/getPlugins.js';
import getScales from './scatterPlot/getScales.js';

// custom plugins
import displayWhiteBackground from './util/displayWhiteBackground.js';

// update methods
import updateConfig from './scatterPlot/updateConfig.js';
import updateData from './scatterPlot/updateData.js';
import updateOption from './util/updateOption.js';
import triggerTooltip from './util/triggerTooltip.js';

/**
 * Generate a scatter plot.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data of predicted analysis output
 * @param {Array} _groupMetadata_ - optional site metadata
 *
 * @returns {Object} Chart.js chart object
 */
export default function scatterPlot(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _bounds_ = null,
    _groupMetadata_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _bounds_, _groupMetadata_);

    // Merge custom settings with default settings.
    const config = configure(_config_, _results_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_results_, config, _bounds_, _groupMetadata_);

    // Configure Chart.js options.
    const options = {
        animation: false,
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: getPlugins(config),
        scales: getScales(config),
    };

    // Instantiate Chart.js chart object.
    const chart = new Chart(canvas, {
        data: {
            datasets, // required by Chart.js
            config,

            // inputs
            _results_,
            _config_,
            _bounds_,
        },
        options,
        plugins: [displayWhiteBackground()],
    });

    // Attach chart object to canvas element.
    canvas.chart = chart;

    // Attach update methods to chart object.
    chart.helpers = {
        updateConfig,
        updateData,
        updateOption,
        triggerTooltip,
    };

    // Trigger tooltip when a Group ID is selected.
    triggerTooltip(chart);

    return chart;
}
