import updateConfig from './updateConfig';
import structureData from './structureData';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} bounds - optional auxiliary data plotted as a line representing bounds
 *
 */
export default function updateData(chart, _data_, _config_, bounds) {
    chart.data.config = updateConfig(chart, _config_);
    chart.data.datasets = structureData(_data_, chart.data.config, bounds);
    chart.update();
}
