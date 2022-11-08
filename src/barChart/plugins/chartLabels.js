export default function chartLabels(config) {
    return {
        align: (context) =>
            (config.y === 'score' && Math.sign(context.dataset.data[context.dataIndex].y) === 1) ||
            (config.y === 'metric' && Math.sign(context.dataset.data[context.dataIndex].y) === -1)
                ? 'start'
                : 'end',
        anchor: (context) =>
            (config.y === 'score' && Math.sign(context.dataset.data[context.dataIndex].y) === 1) ||
            (config.y === 'metric' && Math.sign(context.dataset.data[context.dataIndex].y) === -1)
                ? 'start'
                : 'end',
        //clip: true,
        color: 'black',
        display: (context) =>
            context.chart.getDatasetMeta(0).data[1].width >=
            context.chart.options.font.size - 3,
        formatter: (value, context) =>
            context.chart.data.labels[context.dataIndex],
        rotation: -90,
    };
}
