import configure from './configure.js';
import getPlugins from './getPlugins.js';
import getScales from './getScales.js';
import triggerTooltip from '../util/triggerTooltip.js';

/**
 * Update chart data and optionally redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Object} _config_ - chart configuration and metadata
 * @param {boolean} updateChart - call `chart.update` after updating chart configuration?
 * @param {boolean} updateTooltip - trigger tooltip after updating chart configuration?
 *
 * @returns {Object} updated chart configuration
 */
export default function updateConfig(
    chart,
    _config_,
    updateChart = true,
    updateTooltip = true
) {
    // Update chart configuration.
    const config = configure(
        _config_,
        chart.data.datasets.find((dataset) => dataset.type === 'scatter').data
    );

    // Update data for [ riskSignalSelected ] event.
    chart.canvas.riskSignalSelected.data = config.selectedGroupDatum;

    // Update chart plugins.
    const plugins = getPlugins(config);

    // Update chart scales.
    const scales = getScales(config);

    // Update chart object.
    chart.data.config = config;
    chart.options.plugins = plugins;
    chart.options.scales = scales;

    if (updateChart) chart.update();

    if (updateTooltip) triggerTooltip(chart);

    return config;
}
