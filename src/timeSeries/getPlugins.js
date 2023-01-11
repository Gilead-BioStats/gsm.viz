import annotations from './getPlugins/annotations';
import legend from './getPlugins/legend';
import tooltip from './getPlugins/tooltip';

export default function getPlugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        tooltip: tooltip(config),
    };
}
