import ChartDataLabels from 'chartjs-plugin-datalabels';

import configure from './timeSeries/configure';
import addCanvas from './util/addCanvas';
import structureData from './timeSeries/structureData';

//import onHover from './util/onHover';
//import onClick from './util/onClick';
//import plugins from './barChart/plugins';
//import getScales from './barChart/getScales';
//
//import Chart from 'chart.js/auto';
//import updateData from './barChart/updateData';
//import updateConfig from './barChart/updateConfig';
//import updateOption from './barChart/updateOption';
//import triggerTooltip from './util/triggerTooltip';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null
) {
    // Update config.
    const config = configure(_config_, _data_, _thresholds_);
    console.log(config);
    const canvas = addCanvas(_element_, config);
    console.log(canvas);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config);
    console.log(datasets);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        maintainAspectRatio: config.maintainAspectRatio,
        //onClick,
        //onHover,
        //plugins: plugins(config),
        //scales: getScales(config),
    };

    const chart = new Chart(canvas, {
        type: 'boxplot',
        data: {
            datasets,
            config,
            //_thresholds_,
            _data_,
        },
        //metadata: 'test',
        options,
        //plugins: [ChartDataLabels],
    });

    //    window.myBar = new Chart(ctx, {
    //        type: 'boxplot',
    //        data,
    //        options: {
    //            responsive: true,
    //            legend: {
    //                position: 'top',
    //            },
    //            title: {
    //                display: true,
    //                text: 'Chart.js Box Plot Chart',
    //            },
    //        },
    //    });
    //
    //chart.helpers = {
    //    updateData,
    //    updateConfig,
    //    updateOption,
    //};

    //canvas.chart = chart;

    //triggerTooltip(chart);

    //return chart;
}
