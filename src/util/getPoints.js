// Find data associated with point.
export default function getPoints(event) {
    const points = event.chart.getElementsAtEventForMode(
            event,
            'nearest',
            {
                intersect: true,
            },
            true
        );

    return points;
}
