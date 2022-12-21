// Add event listener to KRI dropdown.
const kri = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        const kris = [
            ...new Set(datasets[1].map((d) => d.workflowid)).values(),
        ];

        for (const i in kris) {
            const option = document.createElement('option');
            option.value = kris[i];
            option.innerHTML = kris[i];
            kriDropdown.appendChild(option);
        }

        kriDropdown.value = workflow.workflowid;
        kriDropdown.addEventListener('change', (event) => {
            // analysis results
            const results = filterOnWorkflowID(datasets[0], event.target.value);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], event.target.value);
            workflow.y = yaxis();
            workflow.selectedGroupIDs = site();

            // threshold annotations
            const parameters = document.getElementById('threshold').checked
                ? mergeParameters(
                    filterOnWorkflowID(datasets[2], event.target.value),
                    filterOnWorkflowID(datasets[3], event.target.value)
                ) : null;


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
