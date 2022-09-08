import { format } from 'd3';

export default function defineBarPlugins(config) {
    const plugins = {
        tooltip: {
            callbacks: {
                label: (data) => {
                    const datum = data.dataset.data[data.dataIndex];
                    const tooltip = [
                        `${config.xLabel}: ${datum.x}`,
                        `${config.yLabel}: ${format('.3f')(datum.y)}`,
                    ];

                    return tooltip;
                },
            },
        },
        datalabels: {
            //anchor: "end",
            //align: "top",

            // anchor: "start",
            // align: "bottom",
            anchor: function (context) {
                let y = context.dataset.data[context.dataIndex].y;
                return y < 0 ? 'end' : 'start';
            },
            align: function (context) {
                let y = context.dataset.data[context.dataIndex].y;
                return y < 0 ? 'top' : 'bottom';
            },
            rotation: 90,
            font: {
                weight: 'bold',
            },
            formatter: function (value, ctx) {
                var index = ctx.dataIndex;
                var label = ctx.chart.data.labels[index];
                return label;
            },
        },
        annotation: {
            annotations: {
                line1: {
                    drawTime: 'beforeDatasetsDraw',
                    type: 'line',
                    yMin: 10,
                    yMax: 10,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5],
                },
            },
        },
        legend: {
            display: false,
        },
    };

    return plugins;
}
