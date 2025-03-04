import { color as d3color } from 'd3';
import colorScheme from '../../../util/colorScheme.js';

export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'scatter') {
        const color = colorScheme[datum.stratum].rgba;
        color.opacity = config.selectedGroupIDs.includes(datum.GroupID)
            ? 1
            : config.selectedGroupIDs.length === 0
            ? 0.5
            : 0.25;

        return color + '';
    }
}
