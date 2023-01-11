import { max } from 'd3';

// Chart.js
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// check inputs > configure > add canvas, structure data
import checkInput from './data/checkInput';
import configure from './barChart/configure';
import addCanvas from './util/addCanvas';
import structureData from './barChart/structureData';

// Chart.js options
import onClick from './util/onClick';
import onHover from './util/onHover';
import getPlugins from './barChart/getPlugins';
import getScales from './barChart/getScales';

// custom plugins
import displayWhiteBackground from './util/displayWhiteBackground';

// update methods
import updateData from './barChart/updateData';
import updateConfig from './barChart/updateConfig';
import updateOption from './util/updateOption';
import triggerTooltip from './util/triggerTooltip';

/**
 * Generate a bar chart.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional auxiliary data of threshold parameters
 *
 * @returns {Object} Chart.js chart object
 */
export default function barChart(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _thresholds_ = null
) {
    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: 'results',
        module: 'barChart',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'analysisMetadata',
        module: 'barChart',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'analysisParameters',
        module: 'barChart',
    });

    // Merge custom settings with default settings.
    const config = configure(_config_, _data_, _thresholds_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_data_, config);

    // Configure Chart.js options.
    const options = {
        animation: false,
        clip: false,
        interaction: {
            intersect: false,
            mode: 'x',
        },
        layout: {
            padding: {
                top:
                    config.y === 'metric'
                        ? max(datasets[0].data, (d) => d.groupid.length) * 8
                        : null,
            },
        },
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: getPlugins(config),
        scales: getScales(config, datasets),
    };

    // Instantiate Chart.js chart object.
    const chart = new Chart(canvas, {
        data: {
            datasets, // required by Chart.js
            config,
            _data_,
            _config_,
            _thresholds_,
        },
        options,
        plugins: [ChartDataLabels, displayWhiteBackground()],
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
