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
        canvas.clickEvent.data = datum;
        canvas.dispatchEvent(canvas.clickEvent);
        canvas.riskSignalSelected.data = {
            StudyID: datum.StudyID,
            SnapshotDate: datum.SnapshotDate,
            MetricID: datum.MetricID,
            GroupLevel: datum.GroupLevel,
            GroupID: datum.GroupID,
        };
        canvas.dispatchEvent(canvas.riskSignalSelected);
    }
}
