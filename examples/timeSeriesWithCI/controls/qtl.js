// Add event listener to QTL dropdown.
const qtl = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const qtlDropdown = document.querySelector('#qtl');

    if (setup === true) {
        const qtls = [...new Set(datasets[1].map((d) => d.MetricID)).values()];

        for (const i in qtls) {
            const option = document.createElement('option');
            option.value = qtls[i];
            option.innerHTML = qtls[i];
            qtlDropdown.appendChild(option);
        }

        qtlDropdown.value = workflow.MetricID;
        qtlDropdown.addEventListener('change', (event) => {
            const workflowID = event.target.value;

            // analysis results
            const results = filterOnWorkflowID(datasets[0], workflowID);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], workflowID);
            workflow.y = 'Metric';

            // threshold annotations
            const parameters = mergeParameters(
                filterOnWorkflowID(datasets[2], workflowID),
                filterOnWorkflowID(datasets[3], workflowID)
            );

            // additional analysis output
            const resultsVertical = filterOnWorkflowID(datasets[4], workflowID);

            instance.helpers.updateData(
                instance,
                results,
                workflow,
                parameters,
                resultsVertical
            );
        });
    }

    return qtlDropdown.value;
};
