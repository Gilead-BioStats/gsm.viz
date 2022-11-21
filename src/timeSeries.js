import configure from './timeSeries/configure';
import addCanvas from './util/addCanvas';
import structureData from './timeSeries/structureData';

import plugins from './timeSeries/plugins';
import getScales from './timeSeries/getScales';

import Chart from 'chart.js/auto';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null,
    _ci_ = null
) {
    // Update config.
    const config = configure(_config_, _data_, _thresholds_);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const data = structureData(_data_, config, _ci_);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        maintainAspectRatio: config.maintainAspectRatio,
        plugins: plugins(config),
        responsive: true,
        scales: getScales(config, _data_, _ci_),
    };

    const chart = new Chart(canvas, {
        data: {
            ...data,
            config,
            _data_,
        },
        options,
    });

    chart.helpers = {
        updateSelectedGroupIDs: updateSelectedGroupIDs.bind(chart),
    };

    canvas.chart = chart;

    return chart;
}
