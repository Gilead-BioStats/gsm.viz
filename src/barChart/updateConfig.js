import configure from './configure';
import plugins from './plugins';
import getScales from './getScales';
import triggerTooltip from '../util/triggerTooltip';

export default function updateConfig(
    chart,
    _config_,
    _thresholds_,
    update = false
) {
    // Update config.
    const config = configure(
        _config_,
        chart.data.datasets
            .find((dataset) => dataset.type === 'bar')
            .data,
        _thresholds_
    );

    // Define plugins (title, tooltip) and scales (x, y).
    chart.options.plugins = plugins(config);
    chart.options.scales = getScales(config);

    chart.data.config = config;

    if (update) chart.update();

    triggerTooltip(chart);

    return config;
}
