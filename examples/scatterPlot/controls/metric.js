// Add event listener to metric dropdown.
const metric = function (MetricID, datasets, setup = false) {
    const metricDropdown = document.querySelector('#metric');

    if (setup === true) {
        const metrics = [...new Set(datasets[0].map((d) => d.MetricID)).values()];

        for (const i in metrics) {
            const option = document.createElement('option');
            option.value = metrics[i];
            option.innerHTML = metrics[i];
            metricDropdown.appendChild(option);
        }

        metricDropdown.value = MetricID;
        metricDropdown.addEventListener('change', (event) => {
            const instance = getChart();

            const results = filterOnMetricID(datasets[0], event.target.value);

            const config = selectMetricID(datasets[1], event.target.value);
            config.xType = xAxisType();
            config.selectedGroupIDs = group();

            const bounds = filterOnMetricID(datasets[2], event.target.value);

            instance.helpers.updateData(
                instance,
                results,
                config,
                bounds,
                datasets[3]
            );
        });
    }

    return metricDropdown.value;
};
