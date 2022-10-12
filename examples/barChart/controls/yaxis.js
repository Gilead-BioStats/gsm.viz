// Add event listener to yaxis dropdown.
const yaxis = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const yaxisDropdown = document.getElementById('yaxis');

    yaxisDropdown.addEventListener('change', (event) => {
        const kriDropdown = document.querySelector('#kri').value;
        const isThreshold = document.getElementById('threshold').checked;

        const workflow = datasets[0].find((d) => d.workflowid === kriDropdown);
        const results = datasets[1].filter((d) => d.workflowid === kriDropdown);

        let thresholds = null;
        if (isThreshold) {
            thresholds = datasets[2].filter(
                (d) => d.workflowid === kriDropdown
            );
        }

        // disable threshold when metric selected
        if (yaxisDropdown.value === 'metric') {
            document.getElementById('threshold').disabled = true
        } else {
            document.getElementById('threshold').disabled = false
        }

        //thresholds = false
        workflow.selectedGroupIDs = [site()];
        instance.helpers.updateData(
            instance,
            results,
            workflow,
            thresholds,
            yaxisDropdown.value
        );
    });

    return yaxisDropdown.value
};
