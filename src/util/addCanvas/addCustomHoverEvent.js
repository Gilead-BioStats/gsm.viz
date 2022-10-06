export default function addCustomHoverEvent(canvas, callback) {
    const hoverEvent = new Event('hover-event');

    canvas.addEventListener(
        'hover-event',
        (event) => {
            const pointDatum = event.data;
            callback(pointDatum);
            return pointDatum;
        },
        false
    );

    return hoverEvent;
}
