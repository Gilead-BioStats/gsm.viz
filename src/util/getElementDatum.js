export default function getElementDatum(activeElements, chart) {
    const element = activeElements[0];
    const data = chart.data.datasets[element.datasetIndex].data;
    const datum = data[element.index];

    return datum;
}
