import annotation from './plugins/annotation';
import legend from './plugins/legend';
import tooltip from './plugins/tooltip';

export default function plugins(config, _data_) {
    const plugins = {
        annotation: annotation(config, _data_),
        legend: legend(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
