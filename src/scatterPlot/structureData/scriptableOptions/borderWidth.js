export default function borderWidth(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'scatter') {
        return 1;
    }
}
