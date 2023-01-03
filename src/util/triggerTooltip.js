/**
 * Trigger tooltip of selected group ID(s).
 *
 * @param {Object} chart - Chart.js chart object
 *
 */
export default function triggerTooltip(chart) {
    const tooltip = chart.tooltip;

    if (tooltip.getActiveElements().length > 0) {
        tooltip.setActiveElements([], { x: 0, y: 0 });
    }

    if (chart.data.config.selectedGroupIDs.length > 0) {
        const data = chart.data.datasets[0].data;

        // get data point corresponding to selected group ID
        const point = data.find((d) =>
            chart.data.config.selectedGroupIDs.includes(d.groupid)
        );

        // get array of data points overlapping data point
        const overlappingPoints = data.filter(
            (d) => d.x === point.x && d.y === point.y
        );

        // map overlapping data points to dataset indices
        const pointIndices = data
            .filter((d, i) => overlappingPoints.includes(d))
            .map((d, i) => ({
                datasetIndex: 0,
                index: data.findIndex((d1, i) => d1 === d),
            }));

        // update tooltip
        tooltip.setActiveElements(pointIndices);
    }

    chart.update();
}
