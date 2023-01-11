// Chart.js
import Chart from 'chart.js/auto';

// check inputs > configure > add canvas, structure data
import checkInput from './data/checkInput';
import configure from './scatterPlot/configure';
import addCanvas from './util/addCanvas';
import structureData from './scatterPlot/structureData';

// Chart.js options
import onHover from './util/onHover';
import onClick from './util/onClick';
import getPlugins from './scatterPlot/getPlugins';
import getScales from './scatterPlot/getScales';

// custom plugins
import displayWhiteBackground from './util/displayWhiteBackground';

// update methods
import updateConfig from './scatterPlot/updateConfig';
import updateData from './scatterPlot/updateData';
import updateOption from './util/updateOption';
import triggerTooltip from './util/triggerTooltip';

/**
 * Generate a scatter plot.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data of predicted analysis output
 *
 * @returns {Object} Chart.js chart object
 */
export default function scatterPlot(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _bounds_ = null
) {
    // Check inputs.
    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: 'results',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'analysisMetadata',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_bounds_',
        argument: _bounds_,
        schemaName: 'resultsPredicted',
        module: 'scatterPlot',
    });

    // Merge custom settings with default settings.
    const config = configure(_config_, _data_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_data_, config, _bounds_);

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
            datasets,
            config,
            _data_,
            _config_,
            _bounds_,
        },
        options,
        plugins: [displayWhiteBackground()],
    });

    // Attach chart to canvas element.
    canvas.chart = chart;

    // Attach update methods to chart.
    chart.helpers = {
        updateConfig,
        updateData,
        updateOption,
        triggerTooltip,
    };

    // Trigger tooltip when a group ID is selected.
    triggerTooltip(chart);

    return chart;
}
