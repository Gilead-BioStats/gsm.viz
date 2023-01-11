import legend from './getPlugins/legend';
import title from './getPlugins/title';
import tooltip from './getPlugins/tooltip';

export default function getPlugins(config) {
    const plugins = {
        legend: legend(config),
        title: title(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
