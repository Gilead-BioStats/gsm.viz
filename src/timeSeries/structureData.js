import { ascending } from 'd3';
import getLabels from './structureData/getLabels';
import boxplot from './structureData/boxplot';
import violin from './structureData/violin';
import atRisk from './structureData/atRisk';
import flagged from './structureData/flagged';
import line from './structureData/line';

export default function structureData(_data_, config) {
    _data_.sort(
        (a, b) => ascending(a[config.x], b[config.x])
    );

    const labels = getLabels(_data_, config);

    const distribution = config.type === 'boxplot'
        ? boxplot(_data_, config, labels)
        : config.type === 'violin'
        ? violin(_data_, config, labels)
        : null;

    const data = {
        labels,
        datasets: [
            distribution,
            atRisk(_data_, config, labels),
            flagged(_data_, config, labels),
            line(_data_, config, labels),
        ].filter(dataset => dataset !== null),
    };
    console.log(data.datasets);

    return data;
}
