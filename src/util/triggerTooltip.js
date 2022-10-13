export default function triggerTooltip(chart) {
    const tooltip = chart.tooltip;

    if (tooltip.getActiveElements().length > 0) {
        tooltip.setActiveElements([], { x: 0, y: 0 });
    }

    if (chart.data.config.selectedGroupIDs.length > 0) {
        const pointIndex = chart.data.datasets[0].data.findIndex((d) =>
            chart.data.config.selectedGroupIDs.includes(d.groupid)
        );

        tooltip.setActiveElements([
            {
                datasetIndex: 0,
                index: pointIndex,
            },
        ]);
    }

    chart.update();
}
