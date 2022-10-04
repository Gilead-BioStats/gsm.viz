export default function getPointDatum(points, chart) {
    const point = points[0];
    const data = chart.data.datasets[point.datasetIndex].data;
    const datum = data[point.index];

    return datum;
}
