import { ascending, descending } from 'd3';
import colorScheme from './colorScheme.js';

/**
 * Maps thresholds to flags.
 *
 * @param {Array} thresholds Array of thresholds.
 *
 * @example
 * // Example of a set of annotation specification:
 * [
 *     {
 *         Threshold: -3,
 *         Flag: -2,
 *         direction: -1,
 *         position: 'start'
 *     },
 *     {
 *         Threshold: -2,
 *         Flag: -1,
 *         direction: -1,
 *         position: 'start'
 *     },
 *     {
 *         Threshold: 2,
 *         Flag: 1,
 *         direction: 1,
 *         position: 'end'
 *     },
 *     {
 *         Threshold: 3,
 *         Flag: 2,
 *         direction: 1,
 *         position: 'end'
 *     },
 * ]
 *
 * @returns {Array} Array of annotation specifications.
 */
export default function mapThresholdsToFlags(_thresholds_, _flags_) {
    let flags;
    if (_flags_ === null) {
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
    } else {
        const flagsSans0 = _flags_.filter((flag) => flag !== 0);

        // Check directionality of flags.
        const flagDirection = flagsSans0.join(',') === flagsSans0.sort(ascending).join(',')
            ? 1
            : -1;

        // TODO: make this work with any set of flags
        flags = _thresholds_.map((threshold,i) => ({
            Threshold: threshold,
            Flag: flagsSans0[i],
            direction: (
                flagDirection == 1 && threshold < 0
                ? -1
                : flagDirection == 1 && threshold > 0
                ? 1
                : flagDirection == -1 && threshold < 0
                ? 1
                : flagDirection == -1 && threshold > 0
                ? -1
                : 0
            ),
            position: (
                flagDirection == 1 && threshold < 0
                ? 'start'
                : flagDirection == 1 && threshold > 0
                ? 'end'
                : flagDirection == -1 && threshold < 0
                ? 'end'
                : flagDirection == -1 && threshold > 0
                ? 'start'
                : 'middle'
            ),
        }));
    }

    const annotations = flags
        .map((flag) => {
            // attach color scheme to flag and define annotation
            const color = colorScheme.find((color) => color.Flag.includes(flag.Flag));

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
