import legend from './getPlugins/legend.js.js.js';
import title from './getPlugins/title.js.js.js';
import tooltip from './getPlugins/tooltip.js.js.js';

export default function getPlugins(config) {
    const plugins = {
        legend: legend(config),
        title: title(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
