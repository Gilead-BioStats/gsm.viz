import colorScheme from '../../../util/colorScheme.js';

export default function thresholds(config) {
    let thresholds = null;

    if (config.displayThresholds && config.thresholds) {
        thresholds = config.thresholds.map((Threshold, i) => {
            const color = colorScheme.find((color) =>
                color.Flag.includes(+Threshold.Flag)
            );
            color.rgba.opacity = 0.5;

            const annotation = {
                type: 'line',
                yMin: Threshold.Threshold,
                yMax: Threshold.Threshold,
                borderColor: color.rgba + '',
                borderWidth: 1,
            };

            return annotation;
        });
    }

    return thresholds;
}
