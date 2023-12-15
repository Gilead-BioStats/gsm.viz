import annotations from './getPlugins/annotations.js.js.js';
import dataLabels from './getPlugins/dataLabels.js.js.js';
import legend from './getPlugins/legend.js.js.js';
import title from './getPlugins/title.js.js.js';
import tooltip from './getPlugins/tooltip.js.js.js';

export default function getPlugins(config) {
    const getPlugins = {
        annotation: {
            annotations: annotations(config),
            clip: true,
        },
        datalabels: dataLabels(config),
        legend: legend(config),
        title: title(config),
        tooltip: tooltip(config),
    };

    return getPlugins;
}
