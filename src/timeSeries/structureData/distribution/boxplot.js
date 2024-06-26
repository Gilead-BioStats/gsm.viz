import { rollups, ascending } from 'd3';

export default function boxplot(data, config) {
    const grouped = rollups(
        data, //.filter(d => +d.Flag === 0),
        (Group) => Group.map((d) => +d[config.y]),
        (d) => d.SnapshotDate
    );

    const dataset = {
        data: grouped.map((d) => d[1]),
        maxBarThickness: 7,
        maxWhiskerThickness: 0,
        meanRadius: /^n_/.test(config.y) ? 3 : 0,
        label: /Flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.Group} Distribution`,
        outlierRadius: 0, ///^n_/.test(config.y) ? 2 : 0,
        pointRadius: 0,
        pointStyle: 'rect',
        purpose: 'distribution',
        radius: 0,
        type: 'boxplot',
    };

    return dataset;
}
