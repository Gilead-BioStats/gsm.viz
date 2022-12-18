const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/status_param_over_time.csv',
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
        const results = datasets[0].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[1].find((d) => d.workflowid === workflowID);
        workflow.selectedGroupIDs = '190';
        workflow.type = 'boxplot'; //'violin';

        // customization data
        const parameters = mergeParameters(
            datasets[2].filter(d => d.workflowid === workflowID),
            datasets[3].filter(d => d.workflowid === workflowID)
        );

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            workflow,
            parameters
        );

        kri(workflow, datasets, true);
        site(datasets, true);
    });
