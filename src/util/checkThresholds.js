import mapThresholdsToFlags from './mapThresholdsToFlags.js.js.js';

export default function checkThresholds(_config_, _thresholds_) {
    let thresholds = _config_.thresholds;

    if (_config_.variableThresholds) return null;

    // TODO: flag groups given user-defined thresholds
    // user-defined thresholds
    if (
        Array.isArray(thresholds) &&
        thresholds.length > 0 &&
        thresholds.every((threshold) => typeof threshold === 'number')
    )
        return mapThresholdsToFlags(thresholds);

    // pre-existing thresholds
    if (
        Array.isArray(thresholds) &&
        thresholds.length > 0 &&
        thresholds.every(
            (threshold) =>
                typeof threshold === 'object' &&
                threshold.hasOwnProperty('threshold') &&
                threshold.hasOwnProperty('flag')
        )
    )
        return thresholds;

    // invalid input
    if (
        _thresholds_ === null ||
        [null].includes(thresholds) ||
        (Array.isArray(thresholds) &&
            (thresholds.length === 0 ||
                thresholds.some((threshold) => typeof threshold !== 'number')))
    )
        return null;

    // Filter workflow thresholds and get associated metadata.
    thresholds = _thresholds_
        .filter((d) => d.param === 'vThreshold')
        .map((d) => (d.value !== undefined ? +d.value : +d.default));

    return mapThresholdsToFlags(thresholds);
}
