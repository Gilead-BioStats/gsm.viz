import { ascending, descending } from 'd3';

export default function mapThresholdsToFlags(_thresholds_) {
    // Capture complete set of thresholds.
    const thresholds = _thresholds_
        .map((threshold) => +threshold)
        .sort(ascending);

    // Sort negative thresholds in descending order to impute corresponding flag.
    const negativeThresholds = thresholds
        .filter((threshold) => threshold < 0)
        .sort(descending);
    const negativeFlags = negativeThresholds.map((threshold, i) => {
        return {
            threshold,
            flag: -(i + 1),
        };
    });

    // Sort positive thresholds in ascending order to impute corresponding flag.
    const positiveThresholds = thresholds
        .filter((threshold) => threshold > 0)
        .sort(ascending);
    const positiveFlags = positiveThresholds.map((threshold, i) => {
        return {
            threshold,
            flag: i + 1,
        };
    });

    // If zero threshold exists, set flag to 0.
    const zeroFlag = thresholds
        .filter((threshold) => threshold === 0)
        .map((threshold) => {
            return {
                threshold,
                flag: 0,
            };
        });

    // Combine negative and positive thresholds/flags.
    const flags = [...negativeFlags, ...zeroFlag, ...positiveFlags].sort(
        (a, b) => a.flag - b.flag
    );

    return flags;
}
