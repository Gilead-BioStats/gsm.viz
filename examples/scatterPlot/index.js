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
        const workflowID = 'kri0001';

        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^kri/.test(d.workflowid))
        );

        // data
        const results = datasets[1].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[0] // destructured assignment
            .find((d) => d.workflowid === workflowID);
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        workflow.selectedGroupIDs =
            results[Math.floor(Math.random() * results.length)].groupid;

        // customization data
        const bounds = datasets[2].filter((d) => d.workflowid === workflowID);

        // configuration
        // visualization
        const instance = rbmViz.default.scatterPlot(
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );

        // controls
        kri(workflow, datasets, true);
        site(datasets, true);
        xAxisType(true);
        lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
