import getElementDatum from '../util/getElementDatum';

export default function onClick(event, activeElements, chart) {
    const config = chart.data.config;

    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].type === config.type
    ) {
        const datum = getElementDatum(activeElements, chart);
        config.clickEvent.data = datum;
        chart.canvas.dispatchEvent(config.clickEvent);
    }
}
