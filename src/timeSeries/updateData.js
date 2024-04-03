import { rollup } from 'd3';
import configure from './configure';
import structureData from './structureData';
import checkThresholds from '../util/checkThresholds';
import colorScheme from '../util/colorScheme';
import getPlugins from './getPlugins';
import getScales from './getScales';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - KRI/QTL results where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - KRI/QTL parameters where each array item is an object of key-value pairs
 * @param {Array} _intervals_ - additional statistical output where each array item is an object of key-value pairs
 *
 */
export default function updateData(
    chart,
    _data_,
    _config_,
    _thresholds_ = null,
    _intervals_ = null,
    _sites_ = null
) {
    const config = configure(_config_, _data_, _thresholds_);

    const datasets = structureData(_data_, config, _thresholds_, _intervals_, _sites_);

    chart.data = {
        datasets,
        labels: datasets.labels,
        config,
        _data_,
        _config_,
        _thresholds_,
        _intervals_,
        _sites_
    };

    // might matter that scales come before plugins
    chart.options.scales = getScales(config);
    chart.options.plugins = getPlugins(config);

    chart.update();
}
