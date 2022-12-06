import getElementDatum from '../util/getElementDatum';

export default function onHover(event, activeElements, chart) {
    const config = chart.data.config;
    //console.log(activeElements);
    //if (activeElements.length)
    //    console.log(chart.data.datasets[activeElements[0].datasetIndex]);

    // TODO: fire event in time series when 
    if (
        activeElements.length &&
        chart.data.datasets[activeElements[0].datasetIndex].type === config.type
    ) {
        const datum = getElementDatum(activeElements, chart);
        config.hoverEvent.data = datum;
        chart.canvas.dispatchEvent(config.hoverEvent);
        event.native.target.style.cursor = 'pointer';
    } else {
        event.native.target.style.cursor = 'default';
    }
}
