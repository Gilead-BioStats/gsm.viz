// Add event listener to metric dropdown.
const metric = function (config, datasets, setup = false) {
    const metricDropdown = document.querySelector('#metric');

    if (setup === true) {
        const metrics = [...new Set(datasets[1].map((d) => d.MetricID)).values()];

        for (const i in metrics) {
            const option = document.createElement('option');
            option.value = metrics[i];
            option.innerHTML = metrics[i];
            metricDropdown.appendChild(option);
        }

        metricDropdown.value = config.MetricID;
        metricDropdown.addEventListener('change', (event) => {
            // analysis results
            const results = filterOnMetricID(datasets[0], event.target.value);

            // chart configuration
            const config = selectMetricID(datasets[1], event.target.value);
            config.y = yAxis();
            config.selectedGroupIDs = group();

            // Threshold annotations
            const parameters =
                config.y === 'Score' &&
                document.getElementById('threshold').checked
                    ? mergeParameters(
                          filterOnMetricID(datasets[2], event.target.value),
                          filterOnMetricID(datasets[3], event.target.value)
                      )
                    : null;

            // group metadata
            const groupMetadata = datasets[4];

            // update
            const instance = getChart();
            instance.helpers.updateData(
                instance,
                results,
                config,
                parameters,
                groupMetadata
            );
        });
    }

    return metricDropdown.value;
};
