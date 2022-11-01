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

    let data;
    if (config.y === 'score') {
        const distribution = config.type === 'boxplot'
            ? boxplot(_data_, config, labels)
            : config.type === 'violin'
            ? violin(_data_, config, labels)
            : null;

        data = {
            labels,
            datasets: [
                distribution,
                atRisk(_data_, config, labels),
                flagged(_data_, config, labels),
                line(_data_, config, labels),
            ].filter(dataset => dataset !== null),
        };
    }

    if (/flag|risk/.test(config.y)) {
        const lineData = _data_
            .map((d,i) => {
                const datum = { ...d };
                datum.x = datum[config.x];//labels
                //.findIndex(label => label === datum[config.x]);
                datum.y = +datum[config.y];
                return datum;
            });

        data = {
            labels,
            datasets: [
                {
                    type: 'line',
                    data: lineData.map(d => d.y),
                    backgroundColor: 'rgba(0,0,255,.75)',
                    borderColor: 'rgba(0,0,255,.25)',
                },
            ],
        }
    }

    return data;
}
