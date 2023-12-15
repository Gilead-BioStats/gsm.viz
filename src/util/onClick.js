import getElementDatum from '../util/getElementDatum.js.js';

export default function onClick(event, activeElements, chart) {
    const canvas = chart.canvas;

    // Trigger click event callback (config.clickCallback) on mouseover of graphical element that
    // supports click events.
    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].listenClick === true
    ) {
        const datum = getElementDatum(activeElements, chart);
        canvas.clickEvent.data = datum;
        canvas.dispatchEvent(canvas.clickEvent);
    }
}
