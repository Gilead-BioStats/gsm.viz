export default function getScales(config) {
    const scales = {
        x: {
            display: false,
            title: {
                display: true,
                text: config.xLabel,
            },
            //type: config.xType,
        },
        y: {
            display: false,
            title: {
                display: true,
                text: config.yLabel,
            },
            //type: config.yType,
        },
    };

    return scales;
}
