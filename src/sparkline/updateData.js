import updateConfig from './updateConfig.js';
import structureData from './structureData.js';
import addCustomEvent from '../util/addCanvas/addCustomEvent.js';
import getPlugins from './getPlugins.js';
import getScales from './getScales.js';
import { min, max } from 'd3';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 *
 */
export default function updateData(chart, _data_, _config_) {
    // Update chart configuration and datasets.
    chart.data.config = updateConfig(chart, _config_);
    chart.data.datasets = structureData(_data_, chart.data.config);

    // Update chart plugins and scales.
    chart.options.plugins = getPlugins(
        chart.data.config,
        chart.data.datasets[0].data
    );
    chart.options.scales = getScales(
        chart.data.config,
        chart.data.datasets[0].data
    );

    chart.update();
}
