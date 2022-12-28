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

<<<<<<< HEAD
        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], workflowID);
=======
        // data
        const results = datasets[1].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[0] // destructured assignment
            .find((d) => d.workflowid === workflowID);
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
>>>>>>> main

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
