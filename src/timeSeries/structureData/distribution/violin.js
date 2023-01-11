import { rollups, ascending } from 'd3';

export default function violin(data, config) {
    const grouped = rollups(
        data, //.filter((d) => +d.flag === 0),
        (group) => group.map((d) => +d[config.y]),
        (d) => d.snapshot_date
    );

    const dataset = {
        data: grouped.map((d) => d[1]),
        label: /flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.group} Distribution`,
        purpose: 'distribution',
        type: 'violin',
    };

    return dataset;
}
