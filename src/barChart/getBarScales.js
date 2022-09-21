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
                /*
            color: "#911",
            font: {
              family: "Comic Sans MS",
              size: 20,
              weight: "bold",
              lineHeight: 1.2,
            },
        */
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
            grid: {
                borderDash: [5],
            },
        },
    };

    return scales;
}
