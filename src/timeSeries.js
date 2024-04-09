// Chart.js
import Chart from 'chart.js/auto';

// check inputs > configure > add canvas, structure data
import checkInputs from './timeSeries/checkInputs';
import configure from './timeSeries/configure';
import addCanvas from './util/addCanvas';
import structureData from './timeSeries/structureData';

// Chart.js options
import onHover from './util/onHover';
import onClick from './util/onClick';
import getPlugins from './timeSeries/getPlugins';
import getScales from './timeSeries/getScales';

// custom plugins
import displayWhiteBackground from './util/displayWhiteBackground';

// update methods
import updateData from './timeSeries/updateData';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs';

/**
 * Generate a time series.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional auxiliary data of threshold parameters
 * @param {Array} _intervals_ - optional auxiliary data of confidence intervals
 * @param {Array} _sites_ - optional site metadata
 *
 * @returns {Object} Chart.js chart object
 */
export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null,
    _intervals_ = null,
    _sites_ = null
) {
    // Check input data against data schema.
    checkInputs(_data_, _config_, _thresholds_, _intervals_, _sites_);

    // Merge custom settings with default settings.
    const config = configure(_config_, _data_, _thresholds_, _intervals_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(
        _data_,
        config,
        _thresholds_,
        _intervals_,
        _sites_
    );

    // Configure Chart.js options.
    const options = {
        animation: false,
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: getPlugins(config),
        responsive: true,
        scales: getScales(config, _data_),
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
            _intervals_,
            _sites_,
        },
        options,
        plugins: [displayWhiteBackground()],
    });

    // Attach chart object to canvas element.
    canvas.chart = chart;

    // Attach update methods to chart object.
    chart.helpers = {
        updateData: updateData.bind(chart),
        updateSelectedGroupIDs: updateSelectedGroupIDs.bind(chart),
    };

    return chart;
}
