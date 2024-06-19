// Add event listener to threshold dropdown.
const threshold = function (workflow, datasets, setup = false) {
    const thresholdToggle = document.getElementById('threshold');

    thresholdToggle.addEventListener('change', (event) => {
        const instance = getChart();
        const workflowID = kri();
        const results = filterOnWorkflowID(datasets[0], workflowID);
        const workflow = selectWorkflowID(datasets[1], workflowID);

        // threshold annotations
        const parameters =
            workflow.y === 'Score' &&
            document.getElementById('threshold').checked
                ? mergeParameters(
                      filterOnWorkflowID(datasets[2], workflowID),
                      filterOnWorkflowID(datasets[3], workflowID)
                  )
                : null;

        workflow.selectedGroupIDs = site();
        instance.helpers.updateData(instance, results, workflow, parameters);
    });
};
