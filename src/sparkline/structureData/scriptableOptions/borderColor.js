import chartLabels from '../../../barChart/plugins/chartLabels';

export default function borderColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'line') {
        return datum === dataset.data[dataset.data.length - 1]
            ? 'black'
            : 'rgba(0, 0, 0, 0.1)';
    }
}
