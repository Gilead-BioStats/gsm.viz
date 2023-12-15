import configure from './configure.js.js.js';
import getPlugins from './getPlugins.js.js.js';
import getScales from './getScales.js.js.js';

/**
 * Update chart data and optionally redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Object} _config_ - chart configuration and metadata
 * @param {boolean} update - call `chart.update`?
 *
 * @returns {Object} updated chart configuration
 */
export default function updateConfig(chart, _config_, update = false) {
    const config = configure(_config_);

    chart.data.config = config;

    if (update) chart.update();

    return config;
}
