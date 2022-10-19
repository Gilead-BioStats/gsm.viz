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
            const workflow = datasets[0].find(
                (d) => d.workflowid === event.target.value
            );
            const results = datasets[1].filter(
                (d) => d.workflowid === workflow.workflowid
            );

            // need to know state of threshold
            const isThreshold = document.getElementById('threshold').checked;

            let thresholds = null;
            if (isThreshold) {
                thresholds = datasets[2].filter(
                    (d) => d.workflowid === workflow.workflowid
                );
            }

            //thresholds = false
            workflow.selectedGroupIDs = site() !== 'None' ? [site()] : [];
            instance.helpers.updateData(
                instance,
                results,
                workflow,
                thresholds
            );
        });
    }

    return kriDropdown.value;
};
