import colorScheme from '../../util/colorScheme';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds.map((x, i) => {
            const annotation = {
                drawTime: 'beforeDatasetsDraw',
                type: 'line',
                yMin: x.threshold,
                yMax: x.threshold,
                borderColor: colorScheme.find((y) => y.flag.includes(+x.flag))
                    .color,
                borderWidth: 1,
                borderDash: [2],
            };

            if (config.type === 'identity')
                annotation.label = {
                    rotation: 'auto',
                    position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
                    color: colorScheme.filter((y) =>
                        y.flag.includes(+x.flag)
                    )[0].color,
                    backgroundColor: 'white',
                    content: `QTL: ${config.thresholds[0].threshold}`, //colorScheme.filter((y) => y.flag.includes(+x.flag))[0].description,
                    display: true, //Math.sign(+x.flag) === 1,
                    font: {
                        size: 12,
                    },
                };

            return annotation;
        });
    }

    return annotations;
}
