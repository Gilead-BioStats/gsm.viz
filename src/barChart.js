import ChartDataLabels from 'chartjs-plugin-datalabels';

import configure from './barChart/configure';
import addCanvas from './util/addCanvas';
import structureData from './barChart/structureData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import plugins from './barChart/plugins';
import getScales from './barChart/getScales';

import Chart from 'chart.js/auto';
import updateData from './barChart/updateData';
import updateConfig from './barChart/updateConfig';
import updateOption from './barChart/updateOption';
import triggerTooltip from './util/triggerTooltip';

export default function barChart(
    _element_,
    _data_,
    _config_ = {},
    thresholds = null,
    yaxis = 'score'
) {
    // Update config.
    const config = configure(_config_, thresholds, yaxis);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: plugins(config),
        scales: getScales(config),
    };

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
        },
        metadata: 'test',
        options,
        plugins: [ChartDataLabels],
    });

    chart.helpers = {
        updateData,
        updateConfig,
        updateOption,
    };

    canvas.chart = chart;

    triggerTooltip(chart);

    return chart;
}
