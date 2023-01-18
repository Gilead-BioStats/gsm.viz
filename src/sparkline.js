// Chart.js
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// check inputs > configure > add canvas, structure data
import checkInputs from './sparkline/checkInputs';
import configure from './sparkline/configure';
import addCanvas from './util/addCanvas';
import structureData from './sparkline/structureData';

// Chart.js options
import onHover from './util/onHover';
import onClick from './util/onClick';
import getPlugins from './sparkline/getPlugins';
import getScales from './sparkline/getScales';

// update methods
import updateData from './sparkline/updateData';
import updateConfig from './sparkline/updateConfig';
import updateOption from './util/updateOption';

/**
 * Generate a sparkline.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional auxiliary data of threshold parameters
 *
 * @returns {Object} Chart.js chart object
 */
export default function sparkline(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _thresholds_ = []
) {
    // Check data inputs against data schema.
    checkInputs(_data_, _config_, _thresholds_);

    // Merge custom settings with default settings.
    const config = configure(_config_, _data_, _thresholds_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_data_, config);

    // Configure Chart.js options.
    const options = {
        animation: false,
        layout: {
            padding: {
                right: 50,
            },
        },
        maintainAspectRatio: config.maintainAspectRatio,
        plugins: getPlugins(config, datasets[0].data),
        scales: getScales(config, datasets[0].data),
    };

    // Instantiate Chart.js chart object.
    const chart = new Chart(canvas, {
        data: {
            datasets, // required by Chart.js
            labels: datasets.labels, // required by Chart.js
            config,

            // inputs
            _data_,
            _config_,
            _thresholds_,
        },
        options,
    });

    // Attach chart to canvas element.
    canvas.chart = chart;

    // Attach update methods to chart object.
    chart.helpers = {
        updateConfig,
        updateData,
        updateOption,
    };

    return chart;
}
