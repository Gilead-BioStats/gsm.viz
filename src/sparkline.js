// Chart.js
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// check inputs > configure > add canvas, structure data
import checkInputs from './sparkline/checkInputs.js';
import configure from './sparkline/configure.js';
import addCanvas from './util/addCanvas.js';
import structureData from './sparkline/structureData.js';

// Chart.js options
import onHover from './util/onHover.js';
import onClick from './util/onClick.js';
import getPlugins from './sparkline/getPlugins.js';
import getScales from './sparkline/getScales.js';

// update methods
import updateData from './sparkline/updateData.js';
import updateConfig from './sparkline/updateConfig.js';
import updateOption from './util/updateOption.js';

/**
 * Generate a sparkline.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - analysis results data with one object per group ID per snapshot date
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional auxiliary data of Threshold parameters
 *
 * @returns {Object} Chart.js chart object
 */
export default function sparkline(
    _element_ = 'body',
    _results_ = [],
    _config_ = null,
    _thresholds_ = null
) {
    // Check data inputs against data schema.
    checkInputs(_results_, _config_, _thresholds_);

    // Merge custom settings with default settings.
    const config = configure(_config_, _results_, _thresholds_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_results_, config);

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
            _results_,
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
