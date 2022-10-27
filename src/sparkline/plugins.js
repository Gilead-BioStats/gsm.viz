import annotation from './plugins/annotation';
import datalabels from './plugins/datalabels';
import legend from './plugins/legend';
import title from './plugins/title';
import tooltip from './plugins/tooltip';

export default function plugins(config, _data_) {
    const plugins = {
        annotation: annotation(config, _data_),
        //datalabels: datalabels(config),
        legend: legend(config),
        //title: {
        //    display: true,
        //    text: _data_[0].groupid,
        //}, // title(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
