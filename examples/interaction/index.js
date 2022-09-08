const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
    '../data/results_bounds.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        const bounds = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        const instance = rbmViz.scatterPlot(
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );

        // Handle data change event.
        const kriDropdown = document.querySelector('#kri')
        kriDropdown
            .addEventListener('change', (event) => {
                const workflow = datasets[0].find(
                    (d) => d.workflowid === event.target.value
                );
                const results = datasets[1].filter(
                    (d) => d.workflowid === workflow.workflowid
                );
                const bounds = datasets[2].filter(
                    (d) => d.workflowid === workflow.workflowid
                );
                instance.helpers.updateData(instance, results, workflow, bounds);
            });

        // Handle config change event.
        document.querySelector('#x-axis-type')
            .addEventListener('change', (event) => {
                instance.helpers.updateOption(
                    instance,
                    'scales.x.type',
                    event.target.value
                );
            });

        // Destroy chart.
        const button = document.getElementById('destroy');
        const destroy = () => {
            instance.destroy();
            button.innerHTML = '<em>Create</em>';
            create()
            button.onclick = destroy;
        }
        const create = () => {
            button.onclick = 
        button.onclick = () => {
            instance.destroy();
            button.innerHTML = '<em>Create</em>';
            button.onclick = () => {
                const workflow = datasets[0].find(
                    (d) => d.workflowid === kriDropdown.value
                );
                console.log(workflow);
                const results = datasets[1].filter(
                    (d) => d.workflowid === workflow.workflowid
                );
                const bounds = datasets[2].filter(
                    (d) => d.workflowid === workflow.workflowid
                );
                const instance = rbmViz.scatterPlot(
                    document.getElementById('container'),
                    results,
                    workflow,
                    bounds
                );
                button.innerHTML = '<strong>KILL</strong>';
            }
        }
    });
