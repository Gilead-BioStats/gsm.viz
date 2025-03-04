import mapThresholdsToFlags from './mapThresholdsToFlags.js';

export default function checkThresholds(_config_, _thresholds_, _flags_) {
    let thresholds = _config_?.thresholds || _thresholds_ || [];

    if (_config_?.variableThresholds) return null;

    // pre-existing thresholds
    if (
        Array.isArray(thresholds) &&
        thresholds.length > 0 &&
        thresholds.every(
            (Threshold) =>
                typeof Threshold === 'object' &&
                Threshold.hasOwnProperty('Threshold') &&
                Threshold.hasOwnProperty('Flag')
        )
    )
        return thresholds;

    // Clean flags.
    let flags = [];
    if (Array.isArray(_flags_)) {
        flags = _flags_.filter(flag => flag != 0);
    }

    if (flags.length === 0 || flags.length !== _thresholds_.length)
        flags = null;

    return mapThresholdsToFlags(thresholds, flags);
}
