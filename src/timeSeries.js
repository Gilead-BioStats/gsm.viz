import configure from './timeSeries/configure';
import addCanvas from './util/addCanvas';
import structureData from './timeSeries/structureData';

import onHover from './util/onHover';
import onClick from './util/onClick';
import plugins from './timeSeries/plugins';
import getScales from './timeSeries/getScales';

import Chart from 'chart.js/auto';
import updateData from './timeSeries/updateData';
import updateSelectedGroupIDs from './timeSeries/updateSelectedGroupIDs';

import { rollup } from 'd3';
import checkThresholds from './util/checkThresholds';
import mapThresholdsToFlags from './util/mapThresholdsToFlags';
import colorScheme from './util/colorScheme';
import displayWhiteBackground from './util/displayWhiteBackground';

export default function timeSeries(
    _element_,
    _data_,
    _config_ = {},
    _thresholds_ = null,
    _intervals_ = null
) {
    // Update config.
    const config = configure(_config_, _data_, _thresholds_);
    const canvas = addCanvas(_element_, config);

    // Define array of input datasets to chart.
    const data = structureData(_data_, config, _intervals_);

    if (Array.isArray(_thresholds_)) {
        const thresholds = [
            ...rollup(
                _thresholds_.filter((d) => d.param === 'vThreshold'),
                (group) => {
                    const flags = checkThresholds({}, group);

                    flags.forEach((flag) => {
                        flag.gsm_analysis_date = group[0].gsm_analysis_date;
                        flag.snapshot_date = group[0].snapshot_date;
                        flag.x = flag.gsm_analysis_date;
                        flag.y = flag.threshold;
                        flag.color = colorScheme.find((color) =>
                            color.flag.includes(flag.flag)
                        );
                    });

                    return flags;
                },
                (d) => d.gsm_analysis_date
            ),
        ].flatMap((d) => d[1]);

        const thresholdData = [
            ...rollup(
                thresholds,
                (group) => ({
                    borderColor: group[0].color.color,
                    //function (d) {
                    //    return d.color.color;
                    //},
                    borderDash: [2],
                    borderWidth: 1,
                    data: group,
                    label: '',
                    radius: 0,
                    stepped: 'before', // 'after'
                    type: 'line',
                }),
                (d) => d.flag
            ),
        ].map((d) => d[1]);

        data.datasets = [...data.datasets, ...thresholdData];
    }

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        animation: false,
        events: ['click', 'mousemove', 'mouseout'],
        maintainAspectRatio: config.maintainAspectRatio,
        onClick,
        onHover,
        plugins: plugins(config),
        responsive: true,
        scales: getScales(config, _data_),
    };

    const chart = new Chart(canvas, {
        data: {
            ...data,
            config,
            _data_,
        },
        options,
        plugins: [
            displayWhiteBackground()
        ],
    });

    chart.helpers = {
        updateData: updateData.bind(chart),
        updateSelectedGroupIDs: updateSelectedGroupIDs.bind(chart),
    };

    canvas.chart = chart;

    return chart;
}
