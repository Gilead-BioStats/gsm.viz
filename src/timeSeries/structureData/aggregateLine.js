import { color as d3color, max, mean, rollup } from 'd3';

export default function aggregateLine(data, config, labels) {
    const aggregateData = rollup(
        data,
        (group) => mean(group, (d) => d[config.y]),
        (d) => d[config.x]
    );

    const countsBySnapshot = rollup(
        data,
        (group) => {
            const N = group.length;
            return rollup(
                group,
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

    const color = '#666666';
    const backgroundColor = d3color(color);
    backgroundColor.opacity = 1;
    const borderColor = d3color(color);
    borderColor.opacity = 0.25;

    const dataset = {
        backgroundColor,
        borderColor,
        data: [...aggregateData].map(([key, value], i) => {
            const x = labels[i];
            const y = value;
            const counts = [...countsBySnapshot.get(labels[i])];

            return {
                ...data.find((d) => d[config.x] === x),
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
        label: 'Study Average',
        pointStyle: 'circle',
        purpose: 'aggregate',
        radius: 2.5,
        type: 'line',
    };

    return dataset;
}
