import configure from './barChart/configure';
import addCanvas from './util/addCanvas';
import structureBarData from './barChart/structureBarData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import defineBarPlugins from './barChart/defineBarPlugins';
import getBarScales from './barChart/getBarScales';

import Chart from 'chart.js/auto';
import updateBarData from './barChart/updateBarData';
import updateBarConfig from './barChart/updateBarConfig';
import updateBarOption from './barChart/updateBarOption';

export default function barChart(_element_, _data_, _config_ = {}) {
    // Update config.
    const config = configure(_config_);

    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const data = structureBarData(_data_, config);
    const datasets = data.data;

    const backgroundColor = function (context, options) {
        //const data = context.dataset;
        //const datum = context.dataset.data[context.dataIndex];
        //if (data.type === 'scatter') {
        //    return this.selectedGroupIDs.includes(datum.groupid)
        //        ? 'black'
        //        : 'rgba(0, 0, 0, 0.1)';
        //} // else {
        //    return options.color;
        //}
    };

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        onHover,
        onClick,
        plugins: defineBarPlugins(config),
        scales: getBarScales(config),
    };

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

    chart.options.inliner_count = data.inliner_count;

    return chart;
}
