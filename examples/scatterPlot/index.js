const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/results_bounds.csv',
    '../data/status_site.csv'
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        // site metadata
        const sites = datasets[3];

        datasets = datasets.map((dataset) =>
            Object.keys(dataset[0]).includes('workflowid')
                ? dataset.filter((d) => /^kri/.test(d.workflowid))
                : dataset
        );

        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);

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
            bounds,
            sites
        );

        // controls
        kri(workflowID, datasets, true);
        site(datasets, true);
        xAxisType(true);
        lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
