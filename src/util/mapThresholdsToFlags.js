import { ascending, descending } from 'd3';

export default function mapThresholdsToFlags(_thresholds_) {
    // Capture complete set of thresholds.
    const thresholds = [...new Set(_thresholds_)] // remove duplicate thresholds
        .map((threshold) => +threshold)
        .sort(ascending);

    // Sort negative thresholds in descending order to impute corresponding Flag.
    const negativeThresholds = thresholds
        .filter((threshold) => threshold < 0)
        .sort(descending);
    const negativeFlags = negativeThresholds.map((threshold, i) => {
        return {
            threshold,
            Flag: -(i + 1),
        };
    });

    // Sort positive thresholds in ascending order to impute corresponding Flag.
    const positiveThresholds = thresholds
        .filter((threshold) => threshold > 0)
        .sort(ascending);
    const positiveFlags = positiveThresholds.map((threshold, i) => {
        return {
            threshold,
            Flag: i + 1,
        };
    });

    // If zero threshold exists, set Flag to 0.
    const zeroFlag = thresholds
        .filter((threshold) => threshold === 0)
        .map((threshold) => {
            return {
                threshold,
                Flag: 0,
            };
        });

    // Combine negative and positive thresholds/flags.
    const flags = [...negativeFlags, ...zeroFlag, ...positiveFlags].sort(
        (a, b) => a.Flag - b.Flag
    );

    return flags;
}
