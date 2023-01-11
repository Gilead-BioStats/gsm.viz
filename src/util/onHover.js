import getElementDatum from '../util/getElementDatum';

export default function onHover(event, activeElements, chart) {
    const canvas = chart.canvas;

    // Trigger hover event callback (config.hoverCallback) on mouseover of graphical element that
    // supports hover events.
    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].listenHover === true
    ) {
        const datum = getElementDatum(activeElements, chart);
        canvas.hoverEvent.data = datum;
        canvas.dispatchEvent(canvas.hoverEvent);
        event.native.target.style.cursor = 'pointer';
    } else {
        event.native.target.style.cursor = 'default';
    }
}
