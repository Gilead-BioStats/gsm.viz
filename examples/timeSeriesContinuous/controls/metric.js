// Add event listener to metric dropdown.
const metric = function (config, datasets, setup = false) {
    const metricDropdown = document.querySelector('#metric');

    if (setup === true) {
        const metrics = [...new Set(datasets[0].map((d) => d.MetricID)).values()];

        for (const i in metrics) {
            const option = document.createElement('option');
            option.value = metrics[i];
            option.innerHTML = metrics[i];
            metricDropdown.appendChild(option);
        }

        metricDropdown.value = config.MetricID;
        metricDropdown.addEventListener('change', (event) => {
            const instance = getChart();

            const MetricID = event.target.value;

            // analysis results
            const results = filterOnMetricID(datasets[0], MetricID);

            // chart configuration
            const config = selectMetricID(datasets[1], MetricID);
            config.y = yAxis();
            config.selectedGroupIDs = group();

            // Threshold annotations
            let parameters = mergeParameters(
                datasets[2].filter((d) => d.MetricID === MetricID),
                datasets[3].filter((d) => d.MetricID === MetricID)
            );
            if (config.y !== 'Score') parameters = null;

            const groupMetadata = datasets[4];

            instance.helpers.updateData(
                instance,
                results,
                config,
                parameters,
                null,
                groupMetadata
            );
        });
    }

    return metricDropdown.value;
};
