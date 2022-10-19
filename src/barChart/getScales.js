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
            },
            type: 'category',
        },
        y: {
            title: {
                display: true,
                text: config[config.y],
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
            grid: {
                borderDash: [5],
            },
        },
    };

    return scales;
}
