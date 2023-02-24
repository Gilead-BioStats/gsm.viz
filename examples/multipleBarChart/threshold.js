// Add event listener to threshold dropdown.
const threshold = function (workflow, datasets, setup = false) {
    const instance = getChart();
    const thresholdToggle = document.getElementById('threshold');

    thresholdToggle.addEventListener('change', (event) => {
        const kriDropdown = document.querySelector('#kri').value;
        // need to know state of threshold
        const isThreshold = thresholdToggle.checked;

        const workflow = datasets[0].find((d) => d.workflowid === kriDropdown);
        const results = datasets[1].filter((d) => d.workflowid === kriDropdown);

        let thresholds = null;
        if (isThreshold) {
            thresholds = datasets[2].filter(
                (d) => d.workflowid === kriDropdown
            );
        }

        //thresholds = false
        workflow.selectedGroupIDs = site() === 'None' ? [] : [site()];
        instance.helpers.updateData(instance, results, workflow, thresholds);
    });
};
