// Chart.js
import Chart from 'chart.js/auto';

// check inputs > configure > add canvas, structure data
import checkInput from './data/checkInput';
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

// update meethods
import updateData from './timeSeries/updateData';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null,
    _intervals_ = null
) {
    const discrete = /^n_((at_risk)?(_or_)?(flagged)?)$/i.test(_config_.y);

    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: discrete ? 'flagCounts' : 'results',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_config_',
        argument: discrete ? null : _config_,
        schemaName: 'analysisMetadata',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'analysisParameters',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_intervals_',
        argument: _intervals_,
        schemaName: 'resultsVertical',
        module: 'timeSeries',
    });

    // Update config.
    const config = configure(_config_, _data_, _thresholds_, _intervals_);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const data = structureData(_data_, config, _thresholds_, _intervals_);

    // Define plugins (title, tooltip) and scales (x, y).
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
            ...data,
            config,
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
