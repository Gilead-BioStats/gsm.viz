import annotations from './getPlugins/annotations.js';
import legend from './getPlugins/legend.js';
import title from './getPlugins/title.js';
import tooltip from './getPlugins/tooltip.js';

export default function getPlugins(config) {
    return {
        annotation: {
            annotations: annotations(config),
        },
        legend: legend(config),
        title: title(config),
        tooltip: tooltip(config),
    };
}
