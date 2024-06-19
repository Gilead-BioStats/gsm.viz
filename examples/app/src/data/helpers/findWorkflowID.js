export default function findWorkflowID(data, workflowID) {
    return data.find((d) => d.MetricID === workflowID);
}
