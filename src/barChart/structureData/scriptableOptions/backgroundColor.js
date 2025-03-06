import { color as d3color } from 'd3';
import colorScheme from '../../../util/colorScheme.js';

export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'bar') {
        const color = colorScheme[datum.stratum];
        color.rgba.opacity =
            config.selectedGroupIDs.includes(datum.GroupID) |
            (config.selectedGroupIDs.length === 0)
                ? 1
                : 0.25;

        return color.rgba + '';
    }
}
