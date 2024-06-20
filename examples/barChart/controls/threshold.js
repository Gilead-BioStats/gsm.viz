// Add event listener to Threshold dropdown.
const threshold = function (workflow, datasets, setup = false) {
    const thresholdToggle = document.getElementById('Threshold');

    thresholdToggle.addEventListener('change', (event) => {
        const instance = getChart();
        const workflowID = kri();
        const results = filterOnWorkflowID(datasets[0], workflowID);
        const workflow = selectWorkflowID(datasets[1], workflowID);

        // Threshold annotations
        const parameters =
            workflow.y === 'Score' &&
            document.getElementById('Threshold').checked
                ? mergeParameters(
                      filterOnWorkflowID(datasets[2], workflowID),
                      filterOnWorkflowID(datasets[3], workflowID)
                  )
                : null;

        workflow.selectedGroupIDs = site();
        instance.helpers.updateData(instance, results, workflow, parameters);
    });
};
