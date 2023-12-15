import annotations from './getPlugins/annotations.js.js.js';
import legend from './getPlugins/legend.js.js.js';
import tooltip from './getPlugins/tooltip.js.js.js';

export default function getPlugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        tooltip: tooltip(config),
    };
}
