import annotation from './getPlugins/annotation';
import legend from './getPlugins/legend';
import tooltip from './getPlugins/tooltip';

export default function getPlugins(config, _data_) {
    const plugins = {
        annotation: annotation(config, _data_),
        legend: legend(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
