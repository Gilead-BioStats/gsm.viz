import colorScheme from '../../util/colorScheme.js';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds.map((x, i) => {
            const annotation = {
                adjustScaleRange: config.GroupLevel === 'Study',
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: x.Threshold,
                yMax: x.Threshold,
                borderColor:
                    config.GroupLevel === 'Study'
                        ? colorScheme.amberRed.color
                        : colorScheme.find((y) => y.Flag.includes(+x.Flag))
                              .color,
                borderWidth: 1,
                borderDash: [2],
            };

            if (
                config.annotateThreshold === true &&
                config.GroupLevel === 'Study'
            ) {
                annotation.label = {
                    rotation: 'auto',
                    position: Math.sign(+x.Flag) >= 0 ? 'end' : 'start',
                    color:
                        config.GroupLevel === 'Study'
                            ? colorScheme.amberRed.color
                            : colorScheme.find((y) => y.Flag.includes(+x.Flag))
                                  .color,
                    backgroundColor: 'white',
                    content: `QTL: ${
                        Math.round(+config.thresholds[0].Threshold * 1000) /
                        (1000).toString()
                    }`,
                    //    .replace(/^(.*\.\d{3})(\d+)$/, '$1')}`, //colorScheme.filter((y) => y.Flag.includes(+x.Flag))[0].description,
                    display: true, //Math.sign(+x.Flag) === 1,
                    font: {
                        size: 12,
                    },
                };
            }

            return annotation;
        });
    }

    return annotations;
}
