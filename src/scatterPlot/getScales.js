export default function getScales(config) {
    const scales = {
        x: {
            display: true,
            title: {
                display: true,
                text: config.xLabel,
            },
            type: config.xType,
        },
        y: {
            display: true,
            title: {
                display: true,
                text: config.yLabel,
            },
            type: config.yType,
        },
    };

    return scales;
}
