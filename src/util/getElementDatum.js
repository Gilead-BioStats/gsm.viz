// TODO: figure out sort order of elements such that the first group ID in the tooltip title is returned
export default function getElementDatum(activeElements, chart) {
    const element = activeElements.sort(
        (a, b) => b.index - a.index // retrieve first element by index in dataset
    )[0];
    const data = chart.data.datasets[element.datasetIndex].data;
    const activeData = data
        .filter((d,i) => (
            activeElements
                .map(activeElement => activeElement.index)
                .includes(i)
        ))
    //    .sort((a,b) => (
    //    ));
    //console.log(activeData);
    const datum = activeData[element.index];

    return datum;
}
