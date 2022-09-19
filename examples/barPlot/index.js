const dataFiles = ['../data/meta_workflow.csv', '../data/results_summary.csv'];

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

        // visualization
        const instance = rbmViz.default.barPlot(
            document.getElementById('container'),
            results,
            workflow
        );

        // Handle data change event.
        document.querySelector('#kri').addEventListener('change', (event) => {
            const workflow = datasets[0].find(
                (d) => d.workflowid === event.target.value
            );
            const results = datasets[1].filter(
                (d) => d.workflowid === workflow.workflowid
            );
            instance.helpers.updateBarData(instance, results, workflow);
        });
    });
