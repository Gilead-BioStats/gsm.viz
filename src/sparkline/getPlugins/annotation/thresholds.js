import colorScheme from '../../../util/colorScheme.js';

export default function thresholds(config) {
    let thresholds = null;

    if (config.displayThresholds && config.thresholds) {
        thresholds = config.thresholds.map((threshold, i) => {
            const color = colorScheme.find((color) =>
                color.Flag.includes(+threshold.Flag)
            );
            color.rgba.opacity = 0.5;

            const annotation = {
                type: 'line',
                yMin: threshold.threshold,
                yMax: threshold.threshold,
                borderColor: color.rgba + '',
                borderWidth: 1,
            };

            return annotation;
        });
    }

    return thresholds;
}
