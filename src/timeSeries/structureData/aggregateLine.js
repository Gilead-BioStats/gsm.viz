import { color as d3color, max, mean, rollup } from 'd3';
import colorScheme from '../../util/colorScheme.js';

export default function aggregateLine(data, config, labels) {
    const aggregateData = rollup(
        data,
        (Group) => mean(Group, (d) => d[config.y]),
        (d) => d[config.x]
    );

    const countsBySnapshot = rollup(
        data,
        (Group) => {
            const N = Group.length;

            return rollup(
                Group,
                (subgroup) => ({
                    n: subgroup.length,
                    N,
                    pct: Math.round((subgroup.length / N) * 100 * 10) / 10,
                }),
                (d) => d[config.y]
            );
        },
        (d) => d[config.x]
    );

    const color =
        /at.risk/.test(config.y) && /flagged/.test(config.y)
            ? colorScheme.amberRed.color
            : /at.risk/.test(config.y)
            ? colorScheme.find((color) => color.Flag.includes(1)).color
            : /flagged/.test(config.y)
            ? colorScheme.find((color) => color.Flag.includes(2)).color
            : '#828282';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color('#828282');
    borderColor.opacity = 0.25;

    const dataset = {
        backgroundColor,
        borderColor,
        data: [...aggregateData].map(([key, value], i) => {
            const x = labels[i];
            const y = value;
            const counts = [...countsBySnapshot.get(labels[i])];

            return {
                //...data.find((d) => d[config.x] === x),
                x,
                y,
                counts: counts
                    .map(([key1, value1]) => {
                        const countLookup = {
                            ...value1,
                        };
                        countLookup[config.y] = key1;

                        return countLookup;
                    })
                    .sort((a, b) => a[config.y] - b[config.y]),
            };
        }),
        label: '',
        pointStyle: 'circle',
        purpose: 'aggregate',
        radius: 2.5,
        type: 'line',
    };

    return dataset;
}
