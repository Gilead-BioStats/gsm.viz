import { rollups, ascending } from 'd3';

export default function boxplot(data, config) {
    const grouped = rollups(
        data, //.filter(d => +d.flag === 0),
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
        //coef: 0,
        maxBarThickness: 7,
        maxWhiskerThickness: 0,
        meanRadius: /^n_/.test(config.y) ? 3 : 0,
        //medianColor: 'rgba(0,0,0,0)',
        label: /flag|at.risk/.test(config.y)
            ? `Distribution`
            : `${config.group} Distribution`,
        //outlierColor: '#999999',
        outlierRadius: 0, ///^n_/.test(config.y) ? 2 : 0,
        //padding: 10,
        pointStyle: 'rect',
        purpose: 'distribution',
        //itemRadius: 0,
        type: 'boxplot',
    };

    return dataset;
}
