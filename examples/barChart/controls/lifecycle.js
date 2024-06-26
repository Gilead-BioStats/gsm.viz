// Add event listener to chart lifecycle button.
const lifecycle = function (datasets, chartFunction, setup = false) {
    let instance = getChart();
    const lifecycleButton = document.getElementById('lifecycle');

    // Destroy chart:
    // 1. calls chart.destroy
    // 2. click event updates to create
    // 3. button text changes to Create
    const destroy = function () {
        this.destroy();
        lifecycleButton.innerHTML = '<em>Create</em>';
        lifecycleButton.onclick = create;
    };
    lifecycleButton.onclick = destroy.bind(instance);

    // Create chart:
    // 1. calls rbmViz.default.scatterPlot
    // 2. click event updates to destroy
    // 3. button text changes to KILL
    const create = () => {
        // analysis results
        const results = filterOnMetricID(datasets[0], metric());

        // chart configuration
        const config = selectMetricID(datasets[1], metric());
        config.y = yAxis();
        config.selectedGroupIDs = group();

        // Threshold annotations
        const parameters =
            config.y === 'Score' &&
            document.getElementById('Threshold').checked
                ? mergeParameters(
                      filterOnMetricID(datasets[2], metric()),
                      filterOnMetricID(datasets[3], metric())
                  )
                : null;

        // group metadata
        const groupMetadata = datasets[4];

        instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            config,
            parameters,
            groupMetadata
        );

        lifecycleButton.innerHTML = '<strong>KILL</strong>';
        lifecycleButton.onclick = destroy.bind(instance);
    };
};
