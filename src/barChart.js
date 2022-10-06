import configure from './barChart/configure';
import addCanvas from './util/addCanvas';
import structureBarData from './barChart/structureBarData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import defineBarPlugins from './barChart/defineBarPlugins';
import getBarScales from './barChart/getBarScales';
import scriptableOptions from './barChart/scriptableOptions';

import Chart from 'chart.js/auto';
import updateBarData from './barChart/updateBarData';
import updateBarConfig from './barChart/updateBarConfig';
import updateBarOption from './barChart/updateBarOption';

export default function barChart(_element_, _data_, _config_ = {}) {
    // Update config.
    const config = configure(_config_);

    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const datasets = structureBarData(_data_, config);
    //const datasets = data.data;

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        onHover,
        onClick,
        plugins: defineBarPlugins(config),
        scales: getBarScales(config),
        ...scriptableOptions(config),
    };
    console.log(config.selectedGroupIDs);

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
        },
        metadata: 'test',
        options,
    });

    chart.helpers = {
        updateBarData: updateBarData,
        updateBarConfig: updateBarConfig,
        updateBarOption: updateBarOption,
    };

    //chart.options.inliner_count = data.inliner_count;
    options.maintainAspectRatio = config.maintainAspectRatio;

    return chart;
}
