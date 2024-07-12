// Add event listener to metric dropdown.
const metric = function (datasets, setup = false, initialValue = null) {
    const metricDropdown = document.querySelector('#metric');

    if (setup === true) {
        const metrics = [
            ...new Set(datasets[1].map((d) => d.MetricID)).values(),
        ].sort((a, b) => {
            // sort kri then cou then qtl
            if (a.startsWith('kri') && b.startsWith('cou')) {
                return -1;
            }
            if (a.startsWith('cou') && b.startsWith('kri')) {
                return 1;
            }
            if (a.startsWith('kri') && b.startsWith('qtl')) {
                return -1;
            }
            if (a.startsWith('qtl') && b.startsWith('kri')) {
                return 1;
            }
            if (a.startsWith('cou') && b.startsWith('qtl')) {
                return -1;
            }
            if (a.startsWith('qtl') && b.startsWith('cou')) {
                return 1;
            }
            return a.localeCompare(b);
        });

        for (const i in metrics) {
            const option = document.createElement('option');
            option.value = metrics[i];
            option.innerHTML = metrics[i];
            metricDropdown.appendChild(option);
        }

        metricDropdown.value = initialValue;
        metricDropdown.addEventListener('change', (event) => {
            // analysis results
            const results = filterOnMetricID(datasets[0], event.target.value);

            // chart configuration
            const config = selectMetricID(datasets[1], event.target.value);
            config.displayTitle = true;
            config.y = yAxis();
            config.selectedGroupIDs = group();

            // Threshold annotations
            const thresholds =
                config.y === 'Score' &&
                document.getElementById('threshold').checked
                    ? config.Thresholds.split(',').map((d) => +d)
                    : null;

            // group metadata
            const groupMetadata = datasets[2];

            // update
            const instance = getChart();
            instance.helpers.updateData(
                instance,
                results,
                config,
                thresholds,
                groupMetadata
            );
        });
    }

    return metricDropdown.value;
};
