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
        const workflow = datasets[0].find((d) => d.workflowid === kri());
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        const bounds = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        workflow.selectedGroupIDs = [site()];
        if (instance.data.datasets[0].type === 'scatter')
            workflow.xType = xAxisType();
        instance = rbmViz.default[chartFunction](
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );
        lifecycleButton.innerHTML = '<strong>KILL</strong>';
        lifecycleButton.onclick = destroy.bind(instance);
    };
};
