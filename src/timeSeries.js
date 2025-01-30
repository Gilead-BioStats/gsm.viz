import getObjectSize from './util/getObjectSize.js';
// Chart.js
import Chart from 'chart.js/auto';

// check inputs > configure > add canvas, structure data
import checkInputs from './timeSeries/checkInputs.js';
import configure from './timeSeries/configure.js';
import addCanvas from './util/addCanvas.js';
import structureData from './timeSeries/structureData.js';

// Chart.js options
import onHover from './util/onHover.js';
import onClick from './util/onClick.js';
import getPlugins from './timeSeries/getPlugins.js';
import getScales from './timeSeries/getScales.js';

// custom plugins
import displayWhiteBackground from './util/displayWhiteBackground.js';

// update methods
import updateData from './timeSeries/updateData.js';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs.js';

/**
 * Generate a time series.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - analysis results data with one object per group ID per snapshot date
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional threshold annotation values
 * @param {Array} _intervals_ - optional auxiliary data with confidence intervals
 * @param {Array} _groupMetadata_ - optional group metadata
 *
 * @returns {Object} Chart.js chart object
 */
export default function timeSeries(
    _element_,
    _results_,
    _config_ = null,
    _thresholds_ = null,
    _intervals_ = null,
    _groupMetadata_ = null
) {
    // Check input data against data schema.
    checkInputs(
        _results_,
        _config_,
        _thresholds_,
        _intervals_,
        _groupMetadata_
    );

    // Merge custom settings with default settings.
    const config = configure(_config_, _results_, _thresholds_, _intervals_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(
        _results_,
        config,
        _thresholds_,
        _intervals_,
        _groupMetadata_
    );

    // Configure Chart.js options.
    const options = {
        animation: false,
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: getPlugins(config),
        responsive: true,
        scales: getScales(config, _results_),
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
            _intervals_,
            _groupMetadata_,
        },
        options,
        plugins: [displayWhiteBackground()],
    });
    for (const key in chart.data) {
        console.log(key);
        const datum = chart.data[key];
        const size = getObjectSize(datum);
        console.log(size/1000);
    }

    // Attach chart object to canvas element.
    canvas.chart = chart;

    // Attach update methods to chart object.
    chart.helpers = {
        updateData: updateData.bind(chart),
        updateSelectedGroupIDs: updateSelectedGroupIDs.bind(chart),
    };

    return chart;
}
