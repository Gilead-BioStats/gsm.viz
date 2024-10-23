import getElementDatum from '../util/getElementDatum.js';
import updateSelectedGroupDatum from '../util/updateSelectedGroupDatum.js';

export default function onClick(event, activeElements, chart) {
    const canvas = chart.canvas;

    // Trigger click event callback (config.clickCallback) on mouseover of graphical element that
    // supports click events.
    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].listenClick === true
    ) {
        const datum = getElementDatum(activeElements, chart);

        // Trigger click event tied to click callback defined in configuration.
        canvas.clickEvent.data = updateSelectedGroupDatum(
            [datum],
            [datum.GroupID]
        );
        canvas.dispatchEvent(canvas.clickEvent);

        // Trigger custom [ riskSignalSelected ] event.
        canvas.riskSignalSelected.data = updateSelectedGroupDatum(
            [datum],
            [datum.GroupID]
        );
        canvas.dispatchEvent(canvas.riskSignalSelected);
    }
}
