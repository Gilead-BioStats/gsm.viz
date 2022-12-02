export default function mapThresholdsToFlags(_thresholds_, complete = true) {
    // Capture complete set of thresholds, even when only a partial set exists in the data.
    let thresholds = _thresholds_.map((threshold) => +threshold);

    //if (complete) {
    //    const nonNegativeThresholds = [
    //        ...new Set(_thresholds_.map((threshold) => Math.abs(threshold))),
    //    ];
    //    const negativeThresholds = nonNegativeThresholds.map(
    //        (threshold) => -1 * threshold
    //    );
    //    thresholds = [
    //        ...new Set([...nonNegativeThresholds, ...negativeThresholds]),
    //    ].sort((a, b) => a - b);
    //}

    // Define sequence centered at 0.
    const flags = thresholds.map((threshold, i) => {
        const flag = i - Math.floor(thresholds.length / 2);
        return {
            threshold,
            flag: flag + (thresholds.length % 2 === 0 && flag >= 0), // Hack that
        };
    });

    return flags;
}
