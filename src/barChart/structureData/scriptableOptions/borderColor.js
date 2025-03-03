import colorScheme from '../../../util/colorScheme.js';

export default function borderColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'bar') {
        return config.selectedGroupIDs.includes(datum.GroupID)
            ? 'black'
            : 'rgba(0, 0, 0, 0.1)';
    }
}
