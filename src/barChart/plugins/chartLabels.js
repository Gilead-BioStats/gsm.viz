export default function chartLabels() {
    return {
        align: (context) =>
            Math.sign(context.dataset.data[context.dataIndex].y) === 1
                ? 'start'
                : 'end',
        anchor: (context) =>
            Math.sign(context.dataset.data[context.dataIndex].y) === 1
                ? 'start'
                : 'end',
        color: 'black',
        display: (context) =>
            context.chart.getDatasetMeta(0).data[1].width >=
            context.chart.options.font.size - 3,
        formatter: (value, context) =>
            context.chart.data.labels[context.dataIndex],
        rotation: -90,
    };
}
