const filterOnWorkflowID = function (data, workflowID) {
    return data.filter((d) => d.MetricID === workflowID);
};
