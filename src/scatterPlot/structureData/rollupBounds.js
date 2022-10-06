import { rollups } from 'd3';

export default function rollupBounds(_bounds_, config) {
    let bounds;

    if (_bounds_ !== null) {
        bounds = rollups(
            _bounds_.sort((a, b) => a.threshold - b.threshold),
            (group) => {
                return {
                    type: 'line',
                    data: group.map((d) => ({
                        x: +d.denominator,
                        y: +d.numerator,
                    })),
                    borderWidth: 1,
                    hoverRadius: 0,
                    pointRadius: 0,
                };
            },
            (d) => d.threshold
        ).map((group, i) => group[1]);

        bounds.forEach((bound, i) => {
            bound.flag = i - Math.floor(bounds.length / 2);
            bound.label = `Bound (Flag = ${bound.flag})`;
            bound.borderColor = config.colors[Math.abs(bound.flag)];
        });
    }

    return bounds;
}
