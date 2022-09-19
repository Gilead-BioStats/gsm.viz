import { getRelativePosition } from 'chart.js/helpers';

export default function onClick(event) {
    const chart = event.chart;
    const config = chart.data.config;

    const canvasPosition = getRelativePosition(event, chart);

    // Substitute the appropriate scale IDs
    const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);

    // Find data associated with point.
    const points = chart.getElementsAtEventForMode(
        event,
        'nearest',
        {
            intersect: true,
        },
        true
    );

    if (points.length) {
        const point = points[0];
        const data = chart.data.datasets[point.datasetIndex].data;
        const datum = data[point.index];
        const workflowid = config.workflowid;
        const groupid = datum.groupid;
        const url = encodeURI(
            [
                `studyid=${datum.studyid}`,
                `workflowid=${datum.workflowid}`,
                `groupid=${datum.groupid}`,
                `group=${config.group}`,
            ].join('&')
        );
    }
}
