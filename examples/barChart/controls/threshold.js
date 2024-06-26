// Add event listener to Threshold dropdown.
const threshold = function (workflow, datasets, setup = false) {
    const thresholdToggle = document.getElementById('Threshold');

    thresholdToggle.addEventListener('change', (event) => {
        const instance = getChart();
        const MetricID = metric();
        const results = filterOnMetricID(datasets[0], MetricID);
        const workflow = selectMetricID(datasets[1], MetricID);

        // Threshold annotations
        const parameters =
            workflow.y === 'Score' &&
            document.getElementById('Threshold').checked
                ? mergeParameters(
                      filterOnMetricID(datasets[2], MetricID),
                      filterOnMetricID(datasets[3], MetricID)
                  )
                : null;

        workflow.selectedGroupIDs = group();
        instance.helpers.updateData(instance, results, workflow, parameters);
    });
};
