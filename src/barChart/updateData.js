import updateConfig from './updateConfig.js';
import structureData from './structureData.js';
import triggerTooltip from '../util/triggerTooltip.js';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _thresholds_ - optional threshold values
 * @param {Array} _groupMetadata_ - optional group metadata
 *
 */
export default function updateData(
    chart,
    _results_,
    _config_,
    _thresholds_,
    _groupMetadata_ = null
) {
    // Update chart configuration.
    const config = updateConfig(chart, _config_, _thresholds_, false, false);

    // Update chart data.
    const datasets = structureData(_results_, config, _groupMetadata_);

    // Update chart.
    chart.data.config = config;
    chart.data.datasets = datasets;
    chart.update();

    // Trigger tooltip, if a value is currently selected.
    triggerTooltip(chart);
}
