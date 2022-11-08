import { rollups, ascending } from 'd3';

export default function violin(_data_, config) {
    const grouped = rollups(
        _data_, //.filter((d) => +d.flag === 0),
        (group) => group.map((d) => +d[config.y]),
        (d) => d.snapshot_date
    );

    const color = config.colorScheme.find((color) =>
        color.flag.some((flag) => Math.abs(flag) === 0)
    );
    color.rgba.opacity = 0.5;

    const dataset = {
        type: 'violin',
        //label: 'Score',
        //backgroundColor: color.rgba + '',
        //borderColor: color.color,
        label: 'Distribution',
        purpose: 'distribution',
        //borderWidth: 1,
        //outlierColor: '#999999',
        //padding: 10,
        //itemRadius: 0,
        data: grouped.map((d) => d[1]),
    };

    return dataset;
}
