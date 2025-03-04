import { ascending, descending } from 'd3';
import colorScheme from './colorScheme.js';

/**
 * Maps thresholds to flags.
 *
 * @param {Array} thresholds Array of thresholds.
 *
 * @example
 * // Example of an annotation object:
 * {
 *     threshold: 1,
 *     flag: 2,
 *     direction: 'down',
 *     position: 'end'
 *     borderColor: 'blue',
 *     borderDash: [2],
 *     borderWidth: 1,
 *     label: {
 *         backgroundColor: 'white',
 *         color: 'blue',
 *         content: 'Blue Flag ↓',
 *         display: true,
 *         padding: 2,
 *         position: 'end',
 *     },
 *     yMin: 1,
 *     yMax: 1,
 * }
 *
 * @returns {Array} Array of flags.
 */
export default function mapThresholdsToFlags(_thresholds_, _flags_) {
    let flags;
    //if (_flags_ === null) {
        // Capture complete set of thresholds.
        const thresholds = [...new Set(_thresholds_)] // remove duplicate thresholds
            .map((Threshold) => +Threshold)
            .sort(ascending);

        // Sort negative thresholds in descending order to impute corresponding flag.
        const negativeThresholds = thresholds
            .filter((Threshold) => Threshold < 0)
            .sort(descending);
        const negativeFlags = negativeThresholds.map((Threshold, i) => {
            return {
                Threshold,
                Flag: -(i + 1),
            };
        });

        // Sort positive thresholds in ascending order to impute corresponding flag.
        const positiveThresholds = thresholds
            .filter((Threshold) => Threshold > 0)
            .sort(ascending);
        const positiveFlags = positiveThresholds.map((Threshold, i) => {
            return {
                Threshold,
                Flag: i + 1,
            };
        });

        // If zero threshold exists, set flag to 0.
        const zeroFlag = thresholds
            .filter((Threshold) => Threshold === 0)
            .map((Threshold) => {
                return {
                    Threshold,
                    Flag: 0,
                };
            });

        // Combine negative and positive thresholds/flags.
    flags = [...negativeFlags, ...zeroFlag, ...positiveFlags].map((flag) => ({
        ...flag,
        direction: Math.sign(+flag.Flag),
        position: Math.sign(+flag.Flag) === 1 ? 'end' : 'start',
    }));
    console.table(flags);
    //} else {
    // TODO: make this work with any set of flags
        flags = _thresholds_.map((threshold,i) => ({
            Threshold: threshold,
            Flag: _flags_[i],
            direction: -1,
            position: 'end',
        }));
    //}
    console.table(flags);

    const annotations = flags
        .map((flag) => {
            // attach color scheme to flag and define annotation
            const color = colorScheme.find((color) => color.Flag.includes(flag.Flag));
            console.log(color);

            return {
                ...flag,
                adjustScaleRange: false,
                borderColor: color.color,
                borderDash: [2],
                borderWidth: 1,
                label: {
                    backgroundColor: 'white',
                    color: color.color,
                    content: (
                        flag.direction === 1 && flag.position === 'start'
                            ? `↑ ${color.description}`
                            : flag.direction === 1 && flag.position === 'end'
                            ? `${color.description} ↑`
                            : flag.direction === -1 && flag.position === 'start'
                            ? `↓ ${color.description}`
                            : flag.direction === -1 && flag.position === 'end'
                            ? `${color.description} ↓`
                            : `${color.description}`
                    ),
                    display: true,
                    font: {
                        size: 12,
                    },
                    padding: 2,
                    position: flag.position,
                    //position: Math.sign(+flag.Flag) === 1 ? 'end' : 'start',
                    rotation: 'auto',
                    yValue: flag.Threshold,
                    yAdjust: 0,
                },
                type: 'line',
                yMin: flag.Threshold,
                yMax: flag.Threshold,
            };
        })
        .sort(
            (a, b) => a.Flag - b.Flag
        );

    return annotations;
}
