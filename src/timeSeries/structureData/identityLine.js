import { color as d3color, max, mean, rollup } from 'd3';
import colorScheme from '../../util/colorScheme.js';

export default function identityLine(data, config, labels) {
    const aggregateData = rollup(
        data,
        (group) => mean(group, (d) => d[config.y]),
        (d) => d[config.x]
    );

    const color = '#666666';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color(color);
    borderColor.opacity = 0.25;

    const dataset = {
        backgroundColor: (d) => {
            if (d.type === 'dataset') {
                return backgroundColor;
            } else {
                return colorScheme.find((color) =>
                    color.flag.includes(+d.raw.flag)
                ).color;
            }
        },
        borderColor,
        data: [...aggregateData].map(([key, value], i) => {
            const x = labels[i];
            const y = value;

            return {
                ...data.find((d) => d[config.x] === x),
                x,
                y,
            };
        }),
        label: '',
        listenHover: true,
        listenClick: true,
        pointStyle: 'circle',
        purpose: 'aggregate',
        radius: 2.5,
        type: 'line',
    };

    return dataset;
}
