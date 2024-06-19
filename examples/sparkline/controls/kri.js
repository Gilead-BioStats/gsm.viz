// Add event listener to KRI dropdown.
const kri = function (datasets, setup = false, workflowID = null) {
    //const instance = getChart();
    const kriDropdown = document.querySelector('#kri');

    if (setup === true) {
        const workflowIDs = [
            ...new Set(datasets[0].map((d) => d.MetricID)).values(),
        ];
        const workflows = datasets[1].filter((workflow) =>
            workflowIDs.includes(workflow.MetricID)
        );

        for (const workflowID of workflowIDs) {
            const option = document.createElement('option');
            const workflow = workflows.find(
                (workflow) => workflow.MetricID === workflowID
            );
            option.value = workflowID;
            option.innerHTML = workflow.Metric;
            kriDropdown.appendChild(option);
        }

        kriDropdown.value = workflowID === null ? workflowIDs[0] : workflowID;

        kriDropdown.addEventListener('change', (event) => {
            const results = datasets[0].filter(
                (d) => d.MetricID === event.target.value
            );
            const workflow = datasets[1].find(
                (d) => d.MetricID === event.target.value
            );

            const charts = getCharts();
            for (const chart of charts) {
                const config = { ...workflow };
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

    return kriDropdown.value;
};
