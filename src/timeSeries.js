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

// update meethods
import updateData from './timeSeries/updateData.js';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs.js';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null,
    _intervals_ = null
) {
    // Check input data against data schema.
    checkInputs(_data_, _config_, _thresholds_, _intervals_);

    // Merge custom settings with default settings.
    const config = configure(_config_, _data_, _thresholds_, _intervals_);

    // Add or select canvas element in which to render chart.
    const canvas = addCanvas(_element_, config);

    // Define array of Chart.js dataset objects.
    const datasets = structureData(_data_, config, _thresholds_, _intervals_);

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
