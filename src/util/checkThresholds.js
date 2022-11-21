import mapThresholdsToFlags from './mapThresholdsToFlags';

export default function checkThresholds(_config_, _thresholds_) {
    let thresholds = _config_.thresholds;

    // TODO: remove hard code check for 'metric'
    // KRI metric is not associated with any thresholds
    if (_config_.y === 'metric') return null;

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
        .map((d) => d.default);

    return mapThresholdsToFlags(thresholds, thresholds.some(threshold => threshold < 0));
}
