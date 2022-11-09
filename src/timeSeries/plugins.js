import annotations from './plugins/annotations';
import legend from './plugins/legend';
import tooltip from './plugins/tooltip';

export default function plugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        tooltip: tooltip(config),
    };
}
