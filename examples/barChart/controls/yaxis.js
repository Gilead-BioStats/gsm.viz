// Add event listener to yaxis dropdown.
const yaxis = function (workflow, datasets, setup = false) {
    const yAxisDropdown = document.getElementById('yaxis');

    if (setup) {
        const instance = getChart();
        yAxisDropdown.value = workflow.y;
        yAxisDropdown.addEventListener('change', (event) => {
            const kriDropdown = document.querySelector('#kri').value;
            const isThreshold = document.getElementById('threshold').checked;

            const workflow = datasets[0].find(
                (d) => d.workflowid === kriDropdown
            );
            workflow.y = yaxis();
            const results = datasets[1].filter(
                (d) => d.workflowid === kriDropdown
            );

            let thresholds = null;
            if (isThreshold) {
                thresholds = datasets[2].filter(
                    (d) => d.workflowid === kriDropdown
                );
            }

            // disable threshold when metric selected
            if (workflow.y === 'metric') {
                document.getElementById('threshold').disabled = true;
            } else {
                document.getElementById('threshold').disabled = false;
            }

            //thresholds = false
            workflow.selectedGroupIDs = site() === 'None' ? [] : site();
            instance.helpers.updateData(
                instance,
                results,
                workflow,
                thresholds
            );
        });
    }

    return yAxisDropdown.value;
};
