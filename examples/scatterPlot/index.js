const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/results_bounds.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^kri/.test(d.workflowid))
        );

        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);
        //results.forEach(d => {
        //    d.flag = Math.random() < .1 ? NaN : +d.flag;
        //});

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], workflowID);

        // threshold annotations
        const bounds = filterOnWorkflowID(datasets[2], workflowID);

        // configuration
        // visualization
        const instance = rbmViz.default.scatterPlot(
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );

        // controls
        kri(workflowID, datasets, true);
        site(datasets, true);
        xAxisType(true);
        lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
