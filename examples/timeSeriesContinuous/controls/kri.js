// Add event listener to KRI dropdown.
const kri = function (workflow, datasets, setup = false) {
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        const kris = [...new Set(datasets[0].map((d) => d.MetricID)).values()];

        for (const i in kris) {
            const option = document.createElement('option');
            option.value = kris[i];
            option.innerHTML = kris[i];
            kriDropdown.appendChild(option);
        }

        kriDropdown.value = workflow.MetricID;
        kriDropdown.addEventListener('change', (event) => {
            const instance = getChart();

            const workflowID = event.target.value;

            // analysis results
            const results = filterOnWorkflowID(datasets[0], workflowID);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], workflowID);
            workflow.y = yaxis();
            workflow.selectedGroupIDs = site();

            // Threshold annotations
            let parameters = mergeParameters(
                datasets[2].filter((d) => d.MetricID === workflowID),
                datasets[3].filter((d) => d.MetricID === workflowID)
            );
            if (workflow.y !== 'Score') parameters = null;

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

    return kriDropdown.value;
};
