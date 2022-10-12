import configure from './configure';
import plugins from './plugins';
import getScales from './getScales';

export default function updateConfig(
    chart,
    _config_,
    thresholds = false,
    update = false
) {
    // Update config.

    const config = configure(_config_, thresholds);

    // Define plugins (title, tooltip) and scales (x, y).
    chart.options.plugins = plugins(config);
    chart.options.scales = getScales(config);

    chart.data.config = config;

    if (update) chart.update();

    return config;
}
