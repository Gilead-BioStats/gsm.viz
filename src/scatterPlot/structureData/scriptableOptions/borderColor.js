import { color as d3color } from 'd3';
import colorScheme from '../../../util/colorScheme.js';

export default function borderColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'scatter') {
        const color = colorScheme[datum.stratum].rgba;
        color.opacity = config.selectedGroupIDs.length === 0 ? 1 : 0.5;

        return config.selectedGroupIDs.includes(datum.GroupID)
            ? 'black'
            : color + '';
    }
}
