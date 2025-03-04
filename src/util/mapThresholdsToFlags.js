import { ascending, descending } from 'd3';

export default function mapThresholdsToFlags(_thresholds_) {
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

    let flags;
    // Symmetric thresholds.
    if (negativeThresholds.length === positiveThresholds.length) {
        // Combine negative and positive thresholds/flags.
        flags = [...negativeFlags, ...zeroFlag, ...positiveFlags].sort(
            (a, b) => a.Flag - b.Flag
        );
    }
    // Asymmetric thresholds.
    else {
        flags = [...new Set(_thresholds_)] // remove duplicate thresholds
            .map((Threshold,i) => {
                return {
                    Threshold,
                    Flag: i+1,
                };
            });
    }
    console.table(flags);

    return flags;
}
