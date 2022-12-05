import colorScheme from '../../util/colorScheme';

export default function annotations(config) {
    let annotations = null;

    if (config.thresholds) {
        annotations = config.thresholds.map((x, i) => ({
            adjustScaleRange: true,
            //clip: false,
            //drawTime: 'beforeDatasetsDraw',
            borderColor: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                .color,
            borderDash: [2],
            borderWidth: 1,
            label: {
                backgroundColor: 'white',
                color: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                    .color,
                content: colorScheme.filter((y) => y.flag.includes(+x.flag))[0]
                    .description,
                display: true, //Math.sign(+x.flag) === 1,
                //drawTime: 'afterDatasetsDraw',
                font: {
                    size: 12,
                },
                position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
                rotation: 'auto',
                yValue: x.threshold,
                yAdjust: 0,
            },
            type: 'line',
            yMin: x.threshold,
            yMax: x.threshold,
        }));
    }

    return annotations;
}
