import { ascending } from 'd3';
import getLabels from './structureData/getLabels';
import boxplot from './structureData/boxplot';
import atRisk from './structureData/atRisk';
import flagged from './structureData/flagged';
import line from './structureData/line';

export default function structureData(_data_, config) {
    _data_.sort(
        (a, b) => ascending(a[config.x], b[config.x])
    );

    const data = {
        labels: getLabels(_data_, config),
        datasets: [
            boxplot(_data_, config),
            atRisk(_data_, config),
            flagged(_data_, config),
            line(_data_, config),
        ],
    };

    return data;
}
