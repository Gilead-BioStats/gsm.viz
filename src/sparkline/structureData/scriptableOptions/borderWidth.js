export default function borderWidth(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'line') {
        return config.selectedGroupIDs.includes(datum.GroupID) ? 3 : 1;
    }
}
