import { color as d3color } from 'd3';

export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'scatter') {
        const color = config.colorScheme[datum.stratum].rgba;
        color.opacity =
            config.selectedGroupIDs.includes(datum.groupid)
                ? 1
                : (config.selectedGroupIDs.length === 0)
                ? .5
                : 0.25;
        return color + '';
    }
}
