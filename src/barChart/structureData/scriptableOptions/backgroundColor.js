import { color as d3color } from 'd3';
import meta_thresholds from '../../../util/colors';

export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'bar') {
        const threshold = meta_thresholds.thresholds.find((x) =>
            x.flag.includes(datum.stratum)
        );
        const color = d3color(threshold.color);
        color.opacity =
            config.selectedGroupIDs.includes(datum.groupid) |
            (config.selectedGroupIDs.length === 0)
                ? 1
                : 0.25;

        return color + '';
    }
}
