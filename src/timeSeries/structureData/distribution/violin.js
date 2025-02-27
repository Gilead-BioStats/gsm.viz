import { rollups, ascending } from 'd3';

export default function violin(data, config) {
    const grouped = rollups(
        data, //.filter((d) => +d.Flag === 0),
        (Group) => Group.map((d) => +d[config.y]),
        (d) => d.SnapshotDate
    );

    const dataset = {
        data: grouped.map((d) => d[1]),
        label: /Flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.GroupLevel} Distribution`,
        purpose: 'distribution',
        type: 'violin',
    };

    return dataset;
}
