import identifyDuplicatePoints from './identifyDuplicatePoints';

export default function getElementDatum(activeElements, chart) {
    const element = activeElements.sort(
        (a, b) => b.index - a.index // retrieve first element by index in dataset
    )[0];
    const data = chart.data.datasets[element.datasetIndex].data;
    const activeData = data.filter((d, i) =>
        activeElements.map((activeElement) => activeElement.index).includes(i)
    );
    identifyDuplicatePoints(activeData, chart.data.config, false);
    const datum = activeData[0];

    return datum;
}
