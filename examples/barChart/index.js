const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/status_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0006';

        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^kri/.test(d.workflowid))
        );

        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], workflowID);
        workflow.y = 'score';

        // threshold annotations
        const parameters = mergeParameters(
            filterOnWorkflowID(datasets[2], workflowID),
            filterOnWorkflowID(datasets[3], workflowID)
        );

        // visualization
        const instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow,
            parameters
        );

        // controls
        kri(workflow, datasets, true);
        site(datasets, true);
        yaxis(workflow, datasets, true);
        threshold(workflow, datasets, true);
        lifecycle(datasets, 'barChart', true);
        download(true);
    });
