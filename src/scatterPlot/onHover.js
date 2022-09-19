export default function onHover(event) {
    const points = event.chart.getElementsAtEventForMode(
        event,
        'nearest',
        {
            intersect: true,
        },
        true
    );

    if (points.length) event.native.target.style.cursor = 'pointer';
    else event.native.target.style.cursor = 'default';
}
