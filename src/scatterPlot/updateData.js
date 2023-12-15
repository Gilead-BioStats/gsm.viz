import updateConfig from './updateConfig.js.js.js';
import structureData from './structureData.js.js.js';
import triggerTooltip from '../util/triggerTooltip.js.js';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data plotted as a line representing bounds
 *
 */
export default function updateData(chart, _data_, _config_, _bounds_) {
    // Update chart configuration.
    const config = updateConfig(chart, _config_, false, false);

    // Update chart data.
    const datasets = structureData(_data_, config, _bounds_);

    // Update chart.
    chart.data.config = config;
    chart.data.datasets = datasets;
    chart.update();

    // Trigger tooltip, if a value is currently selected.
    triggerTooltip(chart);
}
