export default function getElementDatum(activeElements, chart) {
    const element = activeElements.sort(
        (a, b) => b.index - a.index // retrieve first element by index in dataset
    )[0];
    const data = chart.data.datasets[element.datasetIndex].data;
    const datum = data[element.index];

    return datum;
}
