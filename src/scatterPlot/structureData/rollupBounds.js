import { color as d3color, rollup, rollups } from 'd3';
import mapThresholdsToFlags from '../../util/mapThresholdsToFlags.js';
import colorScheme from '../../util/colorScheme.js';

export default function rollupBounds(_bounds_, config) {
    if (_bounds_ !== null) {
        const boundUps = rollups(
            _bounds_.sort((a, b) => a.Threshold - b.Threshold),
            (Group) => {
                return {
                    type: 'line',
                    data: Group.map((d) => ({
                        stratum: Math.abs(+d.Threshold),
                        Threshold: d.Threshold,
                        x: +d.Denominator,
                        y: +d.Numerator,
                    })),
                    borderWidth: 1,
                    hoverRadius: 0,
                    pointRadius: 0,
                };
            },
            (d) => d.Threshold
        );

        // Map thresholds to flags, e.g. -7 > -2, -5 > -1, 5 > 1, 7 > 2.
        const flags = mapThresholdsToFlags(boundUps.map((bound) => bound[0]));

        // TODO: figure out how to hide trend line while maintaining consistent legend marks
        const bounds = boundUps.map((bound, i) => {
            const Group = bound[1];
            Group.Threshold = +bound[0];
            Group.Flag = flags.find(
                (Flag) => Flag.Threshold === Group.Threshold
            );
            const Flag = Group.Flag.Flag;

            Group.label = colorScheme.find((color) =>
                color.Flag.includes(Flag)
            ).description;
            const color = colorScheme[Math.abs(Flag)].color;
            Group.borderColor = color;
            const backgroundColor = d3color(color);
            backgroundColor.opacity = 0.75;
            Group.backgroundColor = backgroundColor + '';

            Group.borderDash = [2];

            //Group.hidden = config.displayTrendLine === false && Group.Threshold === 0;

            if (config.displayTrendLine === false && Group.Threshold === 0) {
                Group.borderColor = 'rgba(0,0,0,0)';
            }

            return Group;
        });
        //.filter(bound => !(config.displayTrendLine === false && bound.Threshold === 0));

        // Remove labels to avoid displaying duplicate legend items.
        rollup(
            bounds,
            (Group) => {
                Group.forEach((d, i) => {
                    if (i > 0) d.label = '';
                });
            },
            (d) => Math.abs(d.Flag.Flag)
        );

        return bounds;
    }
}
