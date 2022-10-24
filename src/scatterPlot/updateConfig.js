import configure from './configure';
import plugins from './plugins';
import getScales from './getScales';
import triggerTooltip from '../util/triggerTooltip';

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
    // Update config.
    const config = configure(
        _config_,
        chart.data.datasets.find(dataset => dataset.type === 'scatter').data
    );

    // Define plugins (title, tooltip) and scales (x, y).
    chart.options.plugins = plugins(config);
    chart.options.scales = getScales(config);

    chart.data.config = config;

    if (update) chart.update();

    triggerTooltip(chart);

    return config;
}
