export default function dataLabels(config) {
    return {
        align: (context) =>
            (config.y === 'Score' &&
                Math.sign(context.dataset.data[context.dataIndex].y) === 1) ||
            (config.y === 'Metric' &&
                Math.sign(context.dataset.data[context.dataIndex].y) === -1)
                ? 'start'
                : 'end',
        anchor: (context) =>
            (config.y === 'Score' &&
                Math.sign(context.dataset.data[context.dataIndex].y) === 1) ||
            (config.y === 'Metric' &&
                Math.sign(context.dataset.data[context.dataIndex].y) === -1)
                ? 'start'
                : 'end',
        //clip: true,
        color: 'black',
        display: (context) => {
            return (
                context.chart.getDatasetMeta(0).data[0].width >=
                context.chart.options.font.size - 3
            );
        },
        formatter: (value, context) =>
            context.chart.data.labels[context.dataIndex],
        rotation: -90,
    };
}
