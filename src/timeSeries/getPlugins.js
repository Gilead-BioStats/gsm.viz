import annotations from './getPlugins/annotations.js';
import legend from './getPlugins/legend.js';
import tooltip from './getPlugins/tooltip.js';

export default function getPlugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        tooltip: tooltip(config),
    };
}
