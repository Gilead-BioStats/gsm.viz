// Add event listener to KRI dropdown.
const kri = function (workflow, datasets, setup = false) {
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        const kris = [...new Set(datasets[1].map((d) => d.MetricID)).values()];

        for (const i in kris) {
            const option = document.createElement('option');
            option.value = kris[i];
            option.innerHTML = kris[i];
            kriDropdown.appendChild(option);
        }

        kriDropdown.value = workflow.MetricID;
        kriDropdown.addEventListener('change', (event) => {
            // analysis results
            const results = filterOnWorkflowID(datasets[0], event.target.value);

            // chart configuration
            const workflow = selectWorkflowID(datasets[1], event.target.value);
            workflow.y = yaxis();
            workflow.selectedGroupIDs = site();

            // Threshold annotations
            const parameters =
                workflow.y === 'Score' &&
                document.getElementById('Threshold').checked
                    ? mergeParameters(
                          filterOnWorkflowID(datasets[2], event.target.value),
                          filterOnWorkflowID(datasets[3], event.target.value)
                      )
                    : null;

            // site metadata
            const sites = datasets[4];

            // update
            const instance = getChart();
            instance.helpers.updateData(
                instance,
                results,
                workflow,
                parameters,
                sites
            );
        });
    }

    return kriDropdown.value;
};
