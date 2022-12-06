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
            const workflow = datasets[1].find(
                (d) => d.workflowid === event.target.value
            );
            const results = datasets[0].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            const parameters = datasets[2].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            workflow.selectedGroupIDs = [site()];

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
