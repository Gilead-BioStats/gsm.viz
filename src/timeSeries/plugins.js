import annotations from './plugins/annotations';
import legend from './plugins/legend';

export default function plugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
    };
}
