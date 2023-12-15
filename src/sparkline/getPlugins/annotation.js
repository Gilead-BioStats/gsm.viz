import annotateThresholds from './annotation/thresholds.js';
import annotateValue from './annotation/value.js';

export default function annotations(config, data) {
    const value = annotateValue(config, data);
    const thresholds = annotateThresholds(config);
    const annotations = {
        clip: false,
        annotations: [value],
    };

    if (thresholds !== null)
        thresholds.forEach((threshold) => {
            annotations.annotations.push(threshold);
        });

    return annotations;
}
