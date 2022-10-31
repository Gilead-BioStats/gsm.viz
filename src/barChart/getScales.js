export default function getScales(config) {
    const scales = {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
            title: {
                display: true,
                text: config.group,
                padding: 50,
            },
            type: 'category',
        },
        y: {
            title: {
                display: true,
                text: config[config.y],
                padding: 30,
            },
            grid: {
                borderDash: [5],
            },
        },
    };

    return scales;
}
