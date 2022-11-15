import { ascending, flatRollup, mean } from 'd3';
import getLabels from './structureData/getLabels';
import getSelectedGroupLine from './structureData/selectedGroupLine';
import getAtRisk from './structureData/atRisk';
import getFlagged from './structureData/flagged';
import getAggregateLine from './structureData/aggregateLine';
import getBoxplot from './structureData/boxplot';
import getViolin from './structureData/violin';

export default function structureData(_data_, config) {
    _data_.sort((a, b) => ascending(a[config.x], b[config.x]));

    const labels = getLabels(_data_, config);

    let datasets;
    const selectedGroupLine = getSelectedGroupLine(_data_, config, labels);
    const flagged = getFlagged(_data_, config, labels);
    const atRisk = getAtRisk(_data_, config, labels);
    const aggregateLine =
        config.dataType === 'discrete'
            ? getAggregateLine(_data_, config, labels)
            : null;
    const distribution =
        config.type === 'boxplot'
            ? getBoxplot(_data_, config, labels)
            : config.type === 'violin'
            ? getViolin(_data_, config, labels)
            : null;

    const data = {
        labels,
        datasets: [
            selectedGroupLine,
            flagged,
            atRisk,
            aggregateLine,
            distribution,
        ].filter((dataset) => dataset !== null),
    };

    return data;
}
