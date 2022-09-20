export default function onBarClick(event, clickedElements) {
    if (clickedElements.length === 0) return;

    const chart = event.chart;
    const config = chart.data.config;

    const { dataIndex, raw } = clickedElements[0].element.$context;
    const barLabel = event.chart.data.labels[dataIndex];

    const url = encodeURI(
        [
            `studyid=${raw.studyid}`,
            `workflowid=${config.workflowid}`,
            `groupid=${raw.x}`,
            `group=${config.group}`,
        ].join('&')
    );

    console.log(url);
}