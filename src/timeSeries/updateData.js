import { rollup } from 'd3';
import configure from './configure.js';
import structureData from './structureData.js';
import checkThresholds from '../util/checkThresholds.js';
import colorScheme from '../util/colorScheme.js';
import getPlugins from './getPlugins.js';
import getScales from './getScales.js';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _results_ - analysis results data with one object per group ID per snapshot date
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional threshold annotation values
 * @param {Array} _intervals_ - optional auxiliary data with confidence intervals
 * @param {Array} _groupMetadata_ - optional group metadata
 *
 */
export default function updateData(
    chart,
    _results_,
    _config_,
    _thresholds_ = null,
    _intervals_ = null,
    _groupMetadata_ = null
) {
    const config = configure(_config_, _results_, _thresholds_);

    const datasets = structureData(
        _results_,
        config,
        _thresholds_,
        _intervals_,
        _groupMetadata_
    );

    chart.data = {
        datasets,
        labels: datasets.labels,
        config,
        _results_,
        _config_,
        _thresholds_,
        _intervals_,
        _groupMetadata_,
    };

    // might matter that scales come before plugins
    chart.options.scales = getScales(config);
    chart.options.plugins = getPlugins(config);

    chart.update();
}
