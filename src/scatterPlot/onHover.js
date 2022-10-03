export default function onHover(event) {
    const chart = event.chart;
    const config = chart.data.config;

    const points = event.chart.getElementsAtEventForMode(
        event,
        'nearest',
        {
            intersect: true,
        },
        true
    );

    if (points.length) {
        const point = points[0];
        const data = chart.data.datasets[point.datasetIndex].data;
        const datum = data[point.index];
        event.native.target.style.cursor = 'pointer';
        config.hoverEvent.data = datum;
        chart.canvas.dispatchEvent(config.hoverEvent);
    } else event.native.target.style.cursor = 'default';
}
