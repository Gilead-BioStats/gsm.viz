import thresholds from '../../../util/colors';

export default function backgroundColor(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'bar') {
        return config.selectedGroupIDs.includes(datum.groupid)
            ? 'black'
            : thresholds.thresholds.find((x) => x.flag.includes(datum.stratum))
                  .color;
    }
}
