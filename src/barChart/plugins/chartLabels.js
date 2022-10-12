export default function chartLabels() {
    return {
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
    }
}