import { rollups, ascending } from 'd3';

export default function boxplot(data, config) {
    const grouped = rollups(
        data, //.filter(d => +d.flag === 0),
        (group) => group.map((d) => +d[config.y]),
        (d) => d.snapshot_date
    );

    const dataset = {
        data: grouped.map((d) => d[1]),
        maxBarThickness: 7,
        maxWhiskerThickness: 0,
        meanRadius: /^n_/.test(config.y) ? 3 : 0,
        label: /flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.group} Distribution`,
        outlierRadius: 0, ///^n_/.test(config.y) ? 2 : 0,
        pointRadius: 0,
        pointStyle: 'rect',
        purpose: 'distribution',
        radius: 0,
        type: 'boxplot',
    };

    return dataset;
}
