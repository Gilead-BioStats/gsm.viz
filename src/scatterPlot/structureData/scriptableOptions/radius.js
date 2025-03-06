export default function radius(context, options) {
    const chart = context.chart;
    const config = chart.data.config;
    const dataset = context.dataset;
    const datum = dataset.data[context.dataIndex];

    if (datum !== undefined && dataset.type === 'scatter') {
        const defaultRadius = 3;
        const hoverRadius = 4;

        if (datum.group !== undefined) {
            // a = pi*r^2 => a/pi = r^2 => sqrt(a/pi) = r
            const enrollmentFactor = Math.sqrt(
                datum.group[config.groupParticipantCountKey] / Math.PI
            );

            return enrollmentFactor * defaultRadius;
        } else {
            return config.selectedGroupIDs.includes(datum.GroupID)
                ? hoverRadius
                : defaultRadius;
        }
    }
}
