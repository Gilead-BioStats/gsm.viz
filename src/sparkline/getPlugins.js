import annotation from './getPlugins/annotation.js.js.js';
import legend from './getPlugins/legend.js.js.js';
import tooltip from './getPlugins/tooltip.js.js.js';

export default function getPlugins(config, _data_) {
    const plugins = {
        annotation: annotation(config, _data_),
        legend: legend(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
