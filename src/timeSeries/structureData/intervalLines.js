import { color as d3color, max, mean, rollup } from 'd3';

export default function intervalLines(_intervals_, config, labels) {
    if (_intervals_ === null) return [null];

    const intervals = rollup(
        _intervals_.filter((d) => /ci/i.test(d.Param)),
        (Group) => +Group[0].Value,
        (d) => d.Param,
        (d) => d.SnapshotDate
    );

    const datasets = [...intervals].map(([key, value], i) => {
        return {
            borderColor: '#666',
            borderDash: [2],
            borderWidth: 1,
            data: [...value.values()],
            hoverRadius: 0,
            label: i === 0 ? 'Confidence Interval' : '',
            pointStyle: 'line',
            purpose: 'aggregate',
            radius: 0,
            type: 'line',
        };
    });

    return datasets;
}
