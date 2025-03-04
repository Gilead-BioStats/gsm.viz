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

    return mapThresholdsToFlags(thresholds, _flags_);
}
