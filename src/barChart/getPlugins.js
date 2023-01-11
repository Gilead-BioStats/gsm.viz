import annotations from './getPlugins/annotations';
import dataLabels from './getPlugins/dataLabels';
import legend from './getPlugins/legend';
import title from './getPlugins/title';
import tooltip from './getPlugins/tooltip';

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
