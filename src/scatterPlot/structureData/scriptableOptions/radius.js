export default function radius(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (dataset.type === 'scatter') {
        if (datum.site !== undefined) {
            // a = pi*r^2
            // a/pi = r^2
            // sqrt(a/pi) = r
            return Math.sqrt(datum.site.enrolled_participants / Math.PI)*3;
        } else {
            return config.selectedGroupIDs.includes(datum.groupid) ? 5 : 3;
        }
    }
}
