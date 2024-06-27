// Add event listener to metric dropdown.
const metric = function (datasets, setup = false, metricID = null) {
    //const instance = getChart();
    const metricDropdown = document.querySelector('#metric');

    if (setup === true) {
        const metricIDs = [
            ...new Set(datasets[0].map((d) => d.MetricID)).values(),
        ];
        const metrics = datasets[1].filter((metric) =>
            metricIDs.includes(metric.MetricID)
        );

        for (const metricID of metricIDs) {
            const option = document.createElement('option');
            const metric = metrics.find(
                (metric) => metric.MetricID === metricID
            );
            option.value = metricID;
            option.innerHTML = metric.Metric;
            metricDropdown.appendChild(option);
        }

        metricDropdown.value = metricID === null ? metricIDs[0] : metricID;

        metricDropdown.addEventListener('change', (event) => {
            const results = datasets[0].filter(
                (d) => d.MetricID === event.target.value
            );
            const metric = datasets[1].find(
                (d) => d.MetricID === event.target.value
            );

            const charts = getCharts();
            for (const chart of charts) {
                const config = { ...metric };
                config.y = chart.data.config.y;
                config.nSnapshots = chart.data.config.nSnapshots;
                config.thresholds = null;

                chart.helpers.updateData(
                    chart,
                    results.filter(
                        (d) =>
                            d.GroupID ===
                            chart.data.datasets[0].data[0]?.GroupID
                    ),
                    config
                );
            }
        });
    }

    return metricDropdown.value;
};
