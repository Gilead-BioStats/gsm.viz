import annotations from './plugins/annotations';
import legend from './plugins/legend';
import tooltip from './plugins/tooltip';
import chartLabels from './plugins/chartLabels';

export default function plugins(config) {
    const plugins = {
        annotation: {
            annotations: annotations(config),
        },
        datalabels: chartLabels(config),
        legend: legend(config),
        tooltip: tooltip(config),
    };

    return plugins;
}
