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
        const results = filterOnWorkflowID(datasets[0], kri());

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], kri());
        workflow.y = yaxis();
        workflow.selectedGroupIDs = site();

        // Threshold annotations
        const parameters =
            workflow.y === 'Score' &&
            document.getElementById('Threshold').checked
                ? mergeParameters(
                      filterOnWorkflowID(datasets[2], kri()),
                      filterOnWorkflowID(datasets[3], kri())
                  )
                : null;

        // site metadata
        const sites = datasets[4];

        instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow,
            parameters,
            sites
        );

        lifecycleButton.innerHTML = '<strong>KILL</strong>';
        lifecycleButton.onclick = destroy.bind(instance);
    };
};
