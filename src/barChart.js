import Chart from 'chart.js/auto';
import addCanvas from './util/addCanvas';
import configure from './barChart/configure';
import structureBarData from './barChart/structureBarData';
import defineBarPlugins from './barChart/defineBarPlugins';
import getBarScales from './barChart/getBarScales';
import updateBarData from './barChart/updateBarData';
import updateBarConfig from './barChart/updateBarConfig';
import updateBarOption from './barChart/updateBarOption';
import generateLegend from './util/generateLegend';
import onBarClick from './barChart/onBarClick';
import onHover from './scatterPlot/onHover';

export default function barChart(_element_, _data_, _config_ = {}) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    // Define array of input datasets to chart.
    const data = structureBarData(_data_, config);
    const datasets = data.data;

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        onClick: onBarClick,
        onHover,
        plugins: defineBarPlugins(config),
        scales: getBarScales(config),
    };

    // https://www.chartjs.org/docs/latest/api/interfaces/Plugin.html
    const customLegend = {
        id: 'customLegend',
        beforeDraw(chart, args, options) {
            generateLegend(chart, '.chartBox');
        },
        defaults: {
            inliner_count: data.inliner_count,
        },
        /*
        afterDatasetUpdate(chart, args, options) {
            generateLegend(chart, '.chartBox');
        },
        */
    };

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
        },
        metadata: 'test',
        options,
        plugins: [customLegend],
    });

    chart.helpers = {
        updateBarData: updateBarData,
        updateBarConfig: updateBarConfig,
        updateBarOption: updateBarOption,
    };

    chart.options.inliner_count = data.inliner_count;

    console.log(chart);

    return chart;
}
