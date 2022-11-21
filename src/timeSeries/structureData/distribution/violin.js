import { rollups, ascending } from 'd3';

export default function violin(data, config) {
    const grouped = rollups(
        data, //.filter((d) => +d.flag === 0),
        (group) => group.map((d) => +d[config.y]),
        (d) => d.snapshot_date
    );

    const color = config.colorScheme.find((color) =>
        color.flag.some((flag) => Math.abs(flag) === 0)
    );
    color.rgba.opacity = 0.5;

    const dataset = {
        data: grouped.map((d) => d[1]),
        //backgroundColor: color.rgba + '',
        //borderColor: color.color,
        //borderWidth: 1,
        //itemRadius: 0,
        label: /flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.group} Distribution`,
        //outlierColor: '#999999',
        //padding: 10,
        purpose: 'distribution',
        type: 'violin',
    };

    return dataset;
}
