import annotations from './getPlugins/annotations.js';
import dataLabels from './getPlugins/dataLabels.js';
import legend from './getPlugins/legend.js';
import title from './getPlugins/title.js';
import tooltip from './getPlugins/tooltip.js';

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
