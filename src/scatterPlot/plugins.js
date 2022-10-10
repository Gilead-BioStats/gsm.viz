import legend from './plugins/legend';
import title from './plugins/title';
import tooltip from './plugins/tooltip';

export default function plugins(config) {
    const plugins = {
        legend: legend(config),
        title: title(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
