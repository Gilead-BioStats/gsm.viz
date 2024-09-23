import resultsSchema from '../data/schema/results.json';
import getElementDatum from '../util/getElementDatum.js';

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
        canvas.clickEvent.data = datum;
        canvas.dispatchEvent(canvas.clickEvent);

        // Trigger custom [ riskSignalSelected ] event.
        canvas.riskSignalSelected.data = resultsSchema.items.required
            .reduce(
                (acc, item) => {
                    acc[item] = datum[item];

                    return acc;
                },
                {}
            );
        canvas.dispatchEvent(canvas.riskSignalSelected);
    }
}
