import configure from './configure';
import defineBarPlugins from './defineBarPlugins';
import getBarScales from './getBarScales';

export default function updateBarConfig(chart, _config_, update = false) {
    // Update config.
    const config = configure(_config_);

    // Define plugins (title, tooltip) and scales (x, y).
    chart.options.plugins = defineBarPlugins(config);
    chart.options.scales = getBarScales(config);

    chart.data.config = config;

    if (update) chart.update();

    return config;
}
