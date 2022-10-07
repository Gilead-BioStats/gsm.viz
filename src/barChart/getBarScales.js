export default function getScales(config) {
    const scales = {
        x: {
            type: 'category',
            ticks: {
                display: false,
            },
            grid: {
                display: false,
            },
        },
        y: {
            title: {
                display: true,
                text: 'AE Reporting Residual Score',
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
            grid: {
                borderDash: [5],
            },
        },
    };

    console.log(scales);

    return scales;
}
