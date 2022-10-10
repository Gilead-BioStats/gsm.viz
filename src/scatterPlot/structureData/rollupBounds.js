import { rollup, rollups } from 'd3';

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

        const bounds = boundUps.map((bound, i) => {
            const threshold = +bound[0];
            const group = bound[1];
            const flag = flags.find((flag) => flag.threshold === threshold);

            group.flag = flag.flag;
            group.label = config.colorMeta.find((color) => {
                return color.flag.includes(group.flag);
            }).description;
            group.borderColor = config.colors[Math.abs(group.flag)];
            group.backgroundColor = config.colors[Math.abs(group.flag)];

            return bound[1];
        });

        // Remove labels to avoid displaying duplicate legend items.
        rollup(
            bounds,
            (group) => {
                group.forEach((d, i) => {
                    if (i > 0) d.label = '';
                });
            },
            (d) => Math.abs(d.flag)
        );

        return bounds;
    }
}
