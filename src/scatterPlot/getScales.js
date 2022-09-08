export default function getScales(config) {
    const scales = {
        x: {
            display: true,
            title: {
                display: true,
                text: config.xLabel,
            },
            type: 'logarithmic',
        },
        y: {
            display: true,
            title: {
                display: true,
                text: config.yLabel,
            },
            type: 'linear',
        },
    };

    return scales;
}
