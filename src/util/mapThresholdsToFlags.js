import { ascending, descending } from 'd3';

export default function mapThresholdsToFlags(_thresholds_) {
    // Capture complete set of thresholds.
    const thresholds = [...new Set(_thresholds_)] // remove duplicate thresholds
        .map((Threshold) => +Threshold)
        .sort(ascending);

    // Sort negative thresholds in descending order to impute corresponding Flag.
    const negativeThresholds = thresholds
        .filter((Threshold) => Threshold < 0)
        .sort(descending);
    const negativeFlags = negativeThresholds.map((Threshold, i) => {
        return {
            Threshold,
            Flag: -(i + 1),
        };
    });

    // Sort positive thresholds in ascending order to impute corresponding Flag.
    const positiveThresholds = thresholds
        .filter((Threshold) => Threshold > 0)
        .sort(ascending);
    const positiveFlags = positiveThresholds.map((Threshold, i) => {
        return {
            Threshold,
            Flag: i + 1,
        };
    });

    // If zero Threshold exists, set Flag to 0.
    const zeroFlag = thresholds
        .filter((Threshold) => Threshold === 0)
        .map((Threshold) => {
            return {
                Threshold,
                Flag: 0,
            };
        });

    // Combine negative and positive thresholds/flags.
    const flags = [...negativeFlags, ...zeroFlag, ...positiveFlags].sort(
        (a, b) => a.Flag - b.Flag
    );

    return flags;
}
