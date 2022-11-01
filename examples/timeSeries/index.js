const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary_over_time.csv',
    '../data/meta_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            workflow,
            parameters
        );
    });
