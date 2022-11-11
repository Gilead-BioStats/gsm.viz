import { color as d3color, mean, rollup } from 'd3';

export default function aggregateGroupLine(_data_, config, labels) {
    const aggregateData = rollup(
        _data_,
        group => mean(group, d => d[config.y]),
        d => d[config.x]
    );

    const color = '#666666';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color(color);
    borderColor.opacity = .25;

    const dataset = {
        backgroundColor,
        borderColor,
        data: [...aggregateData]
            .map(([key, value], i) => ({x: labels[i], y: value})),
        label: 'Study Average',
        purpose: 'aggregate',
        type: 'line',
    };

    return dataset;
}
