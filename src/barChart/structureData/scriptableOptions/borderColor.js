import colorScheme from '../../../util/colorScheme.js';

export default function borderColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'bar') {
        return config.selectedGroupIDs.includes(datum.groupid)
            ? 'black'
            : 'rgba(0, 0, 0, 0.1)';
    }
}
