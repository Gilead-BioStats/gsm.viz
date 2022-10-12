import annotations from './plugins/annotations';
import legend from './plugins/legend';
import tooltip from './plugins/tooltip';

export default function plugins(config) {
    const plugins = {
        annotations: annotations(config),
        legend: legend(config),
        tooltip: tooltip(config),
        datalabels: {
            color: 'black',
            formatter: function (value, context) {
                return context.chart.data.labels[context.dataIndex];
            },
            display: function (context) {
                var barWidth = context.chart.getDatasetMeta(0).data[1].width;
                return barWidth >= 5;
            },
            align: function (context) {
                let y =
                    context.chart.data.datasets[0].data[context.dataIndex].y;
                y_sign = Math.sign(y) === 1 ? 'start' : 'end';

                return y_sign;
            },
            anchor: function (context) {
                let y =
                    context.chart.data.datasets[0].data[context.dataIndex].y;
                y_sign = Math.sign(y) === 1 ? 'start' : 'end';

                return y_sign;
            },
            rotation: 90,
        },
    };

    return plugins;
}
