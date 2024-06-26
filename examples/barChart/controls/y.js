// Add event listener to y-axis dropdown.
const yAxis = function (config, datasets, setup = false) {
    const yAxisDropdown = document.getElementById('yAxis');

    if (setup) {
        yAxisDropdown.value = config.y;
        yAxisDropdown.addEventListener('change', (event) => {
            const instance = getChart();
            const MetricID = metric();

            datasets = datasets.map((dataset) =>
                dataset.filter((d) => /^kri/.test(d.MetricID))
            );

            // analysis results
            const results = filterOnMetricID(datasets[0], MetricID);

            // chart configuration
            const config = selectMetricID(datasets[1], MetricID);
            config.y = event.target.value;
            config.selectedGroupIDs = group();

            // Threshold annotations
            const parameters =
                config.y === 'Score' &&
                document.getElementById('Threshold').checked
                    ? mergeParameters(
                          filterOnMetricID(datasets[2], MetricID),
                          filterOnMetricID(datasets[3], MetricID)
                      )
                    : null;

            instance.helpers.updateData(
                instance,
                results,
                config,
                parameters
            );
        });
    }

    return yAxisDropdown.value;
};
