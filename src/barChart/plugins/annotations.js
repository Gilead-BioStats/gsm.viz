import colorScheme from '../../util/colorScheme';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds.map((x, i) => ({
            drawTime: 'beforeDatasetsDraw',
            type: 'line',
            yMin: x.threshold,
            yMax: x.threshold,
            borderColor: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                .color,
            borderWidth: 1,
            borderDash: [2],
            label: {
                rotation: 'auto',
                position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
                color: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                    .color,
                backgroundColor: 'white',
                content: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                    .description,
                display: true, //Math.sign(+x.flag) === 1,
                font: {
                    size: 12,
                },
            },
        }));
    }

    return annotations;
}
