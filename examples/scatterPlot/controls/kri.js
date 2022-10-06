const kri = function (workflow, datasets, instance, setup = false) {
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        kriDropdown.value = workflow.workflowid;
        kriDropdown.addEventListener('change', (event) => {
            const workflow = datasets[0].find(
                (d) => d.workflowid === event.target.value
            );
            const results = datasets[1].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            const bounds = datasets[2].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            instance.helpers.updateData(instance, results, workflow, bounds);
        });
    }

    return kriDropdown.value;
};
