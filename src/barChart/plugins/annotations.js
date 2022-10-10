import thresholds from '../../util/colors';

export default function annotations(config) {
    const annotations = config.threshold.map((x, i) => ({
        drawTime: 'beforeDatasetsDraw',
        type: 'line',
        yMin: x.threshold,
        yMax: x.threshold,
        borderColor: thresholds.thresholds.filter((y) =>
            y.flag.includes(+x.flag)
        )[0].color,
        borderWidth: 2,
        borderDash: [5],
        label: {
            rotation: 'auto',
            position: Math.sign(+x.flag) === 1 ? 'end' : 'start',
            color: thresholds.thresholds.filter((y) =>
                y.flag.includes(+x.flag)
            )[0].color,
            backgroundColor: 'white',
            content: thresholds.thresholds.filter((y) =>
                y.flag.includes(+x.flag)
            )[0].description,
            display: true, //Math.sign(+x.flag) === 1,
            font: {
                size: 12,
            },
        },
    }));

    return annotations;
}
