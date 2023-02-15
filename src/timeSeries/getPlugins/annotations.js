import colorScheme from '../../util/colorScheme';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds.map((x, i) => {
            const annotation = {
                adjustScaleRange: config.group === 'Study',
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: x.threshold,
                yMax: x.threshold,
                borderColor:
                    config.group === 'Study'
                        ? colorScheme.amberRed.color
                        : colorScheme.find((y) => y.flag.includes(+x.flag))
                              .color,
                borderWidth: 1,
                borderDash: [2],
            };

            if (config.annotateThreshold === true && config.group === 'Study') {
                annotation.label = {
                    rotation: 'auto',
                    position: Math.sign(+x.flag) >= 0 ? 'end' : 'start',
                    color:
                        config.group === 'Study'
                            ? colorScheme.amberRed.color
                            : colorScheme.find((y) => y.flag.includes(+x.flag))
                                  .color,
                    backgroundColor: 'white',
                    content: `QTL: ${
                        Math.round(+config.thresholds[0].threshold * 1000) /
                        (1000).toString()
                    }`,
                    //    .replace(/^(.*\.\d{3})(\d+)$/, '$1')}`, //colorScheme.filter((y) => y.flag.includes(+x.flag))[0].description,
                    display: true, //Math.sign(+x.flag) === 1,
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
