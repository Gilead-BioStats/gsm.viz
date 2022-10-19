import { format } from 'd3';

export default function getScales(config) {
    const scales = {
        x: {
            display: true,
            grid: {
                borderDash: [2],
            },
            ticks: {
                callback: function(value, index, context) {
                    const tick = context[index];
                    return tick.major
                        ? format(',d')(tick.value)
                        : null;
                },
            },
            title: {
                display: true,
                text: config.xLabel,
            },
            type: config.xType,
        },
        y: {
            display: true,
            grid: {
                borderDash: [2],
            },
            title: {
                display: true,
                text: config.yLabel,
            },
            type: config.yType,
        },
    };

    return scales;
}
