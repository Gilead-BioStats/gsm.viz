const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv', // default parameters
    '../data/status_param.csv', // custom parameters
    '../data/results_analysis_over_time.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'qtl0006';

        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^qtl/.test(d.workflowid))
        );

        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], workflowID);
        workflow.y = 'metric';

        // threshold annotations
        const parameters = mergeParameters(
            filterOnWorkflowID(datasets[2], workflowID),
            filterOnWorkflowID(datasets[3], workflowID)
        );

        // additional analysis output
        const resultsVertical = filterOnWorkflowID(datasets[4], workflowID);

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            workflow,
            parameters,
            resultsVertical
        );

        qtl(workflow, datasets, true);
    });
