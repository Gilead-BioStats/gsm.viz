// Add event listener to yaxis dropdown.
const yaxis = function (workflow, datasets, setup = false) {
    const yAxisDropdown = document.getElementById('yaxis');

    if (setup) {
        yAxisDropdown.value = workflow.y;
        yAxisDropdown.addEventListener('change', (event) => {
            const instance = getChart();
            const workflowID = kri();

            datasets = datasets.map((dataset) =>
                dataset.filter((d) => /^kri/.test(d.workflowid))
            );

            // analysis results
            const results = filterOnWorkflowID(datasets[0], workflowID);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], workflowID);
            workflow.y = event.target.value;
            workflow.selectedGroupIDs = site();

            // threshold annotations
            let parameters = mergeParameters(
                filterOnWorkflowID(datasets[2], workflowID),
                filterOnWorkflowID(datasets[3], workflowID)
            );
            if (workflow.y !== 'score')
                parameters = null;

            // site metadata
            const sites = datasets[4];

            instance.helpers.updateData(
                instance,
                results,
                workflow,
                parameters,
                null,
                sites
            );
        });
    }

    return yAxisDropdown.value;
};
