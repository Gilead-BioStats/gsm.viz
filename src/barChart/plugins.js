import annotations from './plugins/annotations';
import legend from './plugins/legend';
import tooltip from './plugins/tooltip';
import chartLabels from './plugins/chartLabels';

export default function plugins(config) {
    const plugins = {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        tooltip: tooltip(config),
        datalabels: chartLabels(),
    };

    return plugins;
}
