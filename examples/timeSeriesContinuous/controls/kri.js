// Add event listener to KRI dropdown.
const kri = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        const kris = [
            ...new Set(datasets[0].map((d) => d.workflowid)).values(),
        ];

        for (const i in kris) {
            const option = document.createElement('option');
            option.value = kris[i];
            option.innerHTML = kris[i];
            kriDropdown.appendChild(option);
        }

        kriDropdown.value = workflow.workflowid;
        kriDropdown.addEventListener('change', (event) => {
            const workflowID = event.target.value;

            // analysis results
            const results = filterOnWorkflowID(datasets[0], workflowID);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], workflowID);
            workflow.selectedGroupIDs = site();

            // threshold annotations
            const parameters = mergeParameters(
                datasets[2].filter((d) => d.workflowid === workflowID),
                datasets[3].filter((d) => d.workflowid === workflowID)
            );

            instance.helpers.updateData(
                instance,
                results,
                workflow,
                parameters
            );
        });
    }

    return kriDropdown.value;
};
