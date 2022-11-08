import configure from './timeSeries/configure';
import addCanvas from './util/addCanvas';
import structureData from './timeSeries/structureData';

//import onHover from './util/onHover';
//import onClick from './util/onClick';
import plugins from './timeSeries/plugins';
//import getScales from './timeSeries/getScales';

import Chart from 'chart.js/auto';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _parameters_ = null
) {
    // Update config.
    const config = configure(_config_, _data_, _parameters_);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const data = structureData(_data_, config);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        maintainAspectRatio: config.maintainAspectRatio,
        //onClick,
        //onHover,
        plugins: plugins(config),
        responsive: true,
        //scales: getScales(config),
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: config.xLabel,
                },
            },
            y: {
                title: {
                    display: true,
                    text: config.yLabel,
                },
            },
        },
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
