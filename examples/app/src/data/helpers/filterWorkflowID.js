export default function filterWorkflowID(data, workflowID) {
    return data.filter((d) => d.MetricID === workflowID);
}
