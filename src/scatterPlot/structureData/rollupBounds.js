import { color as d3color, rollup, rollups } from 'd3';

export default function rollupBounds(_bounds_, config) {
    if (_bounds_ !== null) {
        const boundUps = rollups(
            _bounds_.sort((a, b) => a.threshold - b.threshold),
            (group) => {
                return {
                    type: 'line',
                    data: group.map((d) => ({
                        stratum: Math.abs(+d.threshold),
                        threshold: d.threshold,
                        x: +d.denominator,
                        y: +d.numerator,
                    })),
                    borderWidth: 1,
                    hoverRadius: 0,
                    pointRadius: 0,
                };
            },
            (d) => d.threshold
        );

        // Verbose method to preserve color mapping when working with partial set of thresholds,
        // like [0, 5, 7] instead of [-7, -5, 0, 5, 7].
        const positiveThresholds = [
            ...new Set(boundUps.map((bound) => Math.abs(bound[0]))),
        ];
        const negativeThresholds = positiveThresholds.map(
            (threshold) => -1 * threshold
        );
        const thresholds = [
            ...new Set([...positiveThresholds, ...negativeThresholds]),
        ].sort((a, b) => a - b);
        const flags = thresholds.map((threshold, i) => {
            return {
                threshold,
                flag: i - Math.floor(thresholds.length / 2),
            };
        });

        // TODO: figure out how to hide trend line while maintaining consistent legend marks
        const bounds = boundUps
            .map((bound, i) => {
                const group = bound[1];
                group.threshold = +bound[0];
                group.flag = flags.find(
                    (flag) => flag.threshold === group.threshold
                );
                const flag = group.flag.flag;

                group.label = config.colorMeta.find((color) => {
                    return color.flag.includes(flag);
                }).description;
                const color = config.colors[Math.abs(flag)];
                group.borderColor = color;
                const backgroundColor = d3color(color);
                backgroundColor.opacity = 0.75;
                group.backgroundColor = backgroundColor + '';
                group.borderDash = [2];

                //group.hidden = config.displayTrendLine === false && group.threshold === 0;

                if (config.displayTrendLine === false && group.threshold === 0) {
                    group.borderColor = 'rgba(0,0,0,0)';
                }

                return group;
            })
        //.filter(bound => !(config.displayTrendLine === false && bound.threshold === 0));

        // Remove labels to avoid displaying duplicate legend items.
        rollup(
            bounds,
            (group) => {
                group.forEach((d, i) => {
                    if (i > 0) d.label = '';
                });
            },
            (d) => Math.abs(d.flag.flag)
        );

        return bounds;
    }
}
