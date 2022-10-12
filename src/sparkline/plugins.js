import legend from './plugins/legend';
import title from './plugins/title';
import tooltip from './plugins/tooltip';

export default function plugins(config, _data_) {
    const plugins = {
        legend: legend(config),
        //title: {
        //    display: true,
        //    text: _data_[0].groupid,
        //}, // title(config),
        // tooltip: tooltip(config),
    };

    return plugins;
}
