import colorScheme from '../../util/colorScheme';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds
            .sort((a, b) => Math.abs(a.threshold) - Math.abs(b.threshold))
            .map((x, i) => {
                const content = colorScheme.find((y) =>
                    y.flag.includes(+x.flag)
                ).description;

                return {
                    adjustScaleRange: false,
                    borderColor: colorScheme.filter((y) =>
                        y.flag.includes(+x.flag)
                    )[0].color,
                    borderDash: [2],
                    borderWidth: 1,
                    label: {
                        backgroundColor: 'white',
                        color: colorScheme.filter((y) =>
                            y.flag.includes(+x.flag)
                        )[0].color,
                        content:
                            Math.sign(+x.flag) === 1
                                ? `${content} ↑`
                                : `↓ ${content}`,
                        display: true,
                        font: {
                            size: 12,
                        },
                        padding: 2,
                        position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
                        rotation: 'auto',
                        yValue: x.threshold,
                        yAdjust: 0,
                    },
                    type: 'line',
                    yMin: x.threshold,
                    yMax: x.threshold,
                };
            });
    }

    return annotations;
}
