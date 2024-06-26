// Add event listener to yaxis dropdown.
const yAxis = function (config, datasets, setup = false) {
    const yAxisDropdown = document.getElementById('yAxis');

    if (setup) {
        yAxisDropdown.value = config.y;
        yAxisDropdown.addEventListener('change', (event) => {
            const instance = getChart();
            const MetricID = metric();

            datasets = datasets.map((dataset) =>
                Object.keys(dataset[0]).includes('MetricID')
                    ? dataset.filter((d) => /^kri/.test(d.MetricID))
                    : dataset
            );

            // analysis results
            const results = filterOnMetricID(datasets[0], MetricID);

            // chart configuration
            const config = selectMetricID(datasets[1], MetricID);
            config.y = event.target.value;
            config.selectedGroupIDs = group();

            // Threshold annotations
            let parameters = mergeParameters(
                filterOnMetricID(datasets[2], MetricID),
                filterOnMetricID(datasets[3], MetricID)
            );
            if (config.y !== 'Score') parameters = null;

            // group metadata
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

    return yAxisDropdown.value;
};
