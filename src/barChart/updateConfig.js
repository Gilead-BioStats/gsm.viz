import configure from './configure';
import plugins from './plugins';
import getScales from './getScales';
import triggerTooltip from '../util/triggerTooltip';

export default function updateConfig(chart, _config_, update = false) {
    // Update config.
    const config = configure(_config_);

    // Define plugins (title, tooltip) and scales (x, y).
    chart.options.plugins = plugins(config);
    chart.options.scales = getScales(config);

    chart.data.config = config;

    triggerTooltip(chart);

    if (update) chart.update();

    return config;
}
