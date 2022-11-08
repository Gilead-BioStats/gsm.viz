export default function getDefaultScales() {
    const defaultScales = {
        x: {
            grid: {
                borderDash: [2],
                display: false,
                drawBorder: false,
            },
            ticks: {
                display: true,
            },
            title: {
                display: true,
                text: null,
            },
            type: null,
        },
        y: {
            grid: {
                borderDash: [2],
                display: true,
                drawBorder: false,
            },
            ticks: {
                display: true,
            },
            title: {
                display: true,
                text: null,
                padding: null,
            },
            type: null,
        },
    };

    return defaultScales;
}
