import ChartDataLabels from 'chartjs-plugin-datalabels';

import checkInput from './data/checkInput';
import configure from './barChart/configure';
import addCanvas from './util/addCanvas';
import structureData from './barChart/structureData';

import { min, max } from 'd3';
import onClick from './util/onClick';
import onHover from './util/onHover';
import plugins from './barChart/plugins';
import getScales from './barChart/getScales';
import displayWhiteBackground from './util/displayWhiteBackground';

import Chart from 'chart.js/auto';
import updateData from './barChart/updateData';
import updateConfig from './barChart/updateConfig';
import updateOption from './barChart/updateOption';
import triggerTooltip from './util/triggerTooltip';

export default function barChart(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null
) {
    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: 'results',
        module: 'barChart',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'analysisMetadata',
        module: 'barChart',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'analysisParameters',
        module: 'barChart',
    });

    // Update config.
    const config = configure(_config_, _data_, _thresholds_);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        clip: false,
        events: ['click', 'mousemove', 'mouseout'],
        interaction: {
            intersect: false,
            mode: 'x',
        },
        layout: {
            padding: {
                top:
                    config.y === 'metric'
                        ? max(datasets[0].data, (d) => d.groupid.length) * 8
                        : null,
            },
        },
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: plugins(config),
        scales: getScales(config, datasets),
    };

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config,
            _thresholds_,
            _data_,
        },
        metadata: 'test',
        options,
        plugins: [ChartDataLabels, displayWhiteBackground()],
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
