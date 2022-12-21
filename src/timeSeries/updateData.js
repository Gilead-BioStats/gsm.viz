import configure from './configure';
import structureData from './structureData';
import plugins from './plugins';
import getScales from './getScales';
import { rollup } from 'd3';
import checkThresholds from '../util/checkThresholds';
import colorScheme from '../util/colorScheme';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - KRI/QTL results where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - KRI/QTL parameters where each array item is an object of key-value pairs
 * @param {Array} _analysis_ - additional statistical output where each array item is an object of key-value pairs
 *
 */
export default function updateData(
    chart,
    _data_,
    _config_,
    _thresholds_ = null,
    _analysis_ = null
) {
    const config = configure(_config_, _data_, _thresholds_);

    const data = structureData(_data_, config, _analysis_);

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

    chart.data = {
        ...data,
        config,
        _data_,
    };

    chart.options.scales = getScales(config);
    chart.options.plugins = plugins(config);

    chart.update();
}
