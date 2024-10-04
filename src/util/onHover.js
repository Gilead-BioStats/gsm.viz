import getElementDatum from '../util/getElementDatum.js';
import updateSelectedGroupDatum from '../util/updateSelectedGroupDatum.js';

export default function onHover(event, activeElements, chart) {
    const canvas = chart.canvas;

    // Trigger hover event callback (config.hoverCallback) on mouseover of graphical element that
    // supports hover events.
    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].listenHover === true
    ) {
        event.native.target.style.cursor = 'pointer';

        const datum = getElementDatum(activeElements, chart);

        // Trigger click event tied to click callback defined in configuration.
        canvas.hoverEvent.data = updateSelectedGroupDatum(
            [datum],
            [datum.GroupID]
        );
        canvas.dispatchEvent(canvas.hoverEvent);
    } else {
        event.native.target.style.cursor = 'default';
    }
}
