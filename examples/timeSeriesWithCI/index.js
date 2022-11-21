const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/results_analysis_over_time.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'qtl0004';

        datasets = datasets.map(dataset =>
            dataset.filter((d) => /^qtl/.test(d.workflowid))
        );

        // data
        const results = datasets[0].filter(
            (d) => d.workflowid === workflowID
        );

        // configuration
        const workflow = datasets[1].find((d) => d.workflowid === workflowID);
        workflow.type = 'aggregate';

        // customization data
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // Additional analysis output
        const analysis = datasets[3].filter(
            (d) => d.workflowid === workflowID
        );

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            workflow,
            parameters,
            _ci_ = analysis
        );

        site(datasets, true);
    });
