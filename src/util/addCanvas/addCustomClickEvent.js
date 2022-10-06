export default function addCustomClickEvent(canvas, callback) {
    const clickEvent = new Event('click-event');

    canvas.addEventListener(
        'click-event',
        (event) => {
            const pointDatum = event.data;
            callback(pointDatum);
            return pointDatum;
        },
        false
    );

    return clickEvent;
}
