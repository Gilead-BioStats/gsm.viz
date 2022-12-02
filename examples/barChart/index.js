const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
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
        const results = datasets[1].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[0].find((d) => d.workflowid === workflowID);
        workflow.y = 'score';
        //workflow.thresholds = [-3, -2, 2, 3];
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        //workflow.selectedGroupIDs =
        //    results[Math.floor(Math.random() * results.length)].groupid;
        //workflow.selectedGroupIDs = '145';

        // threshold annotations
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflowID
        );
        const customParameters = datasets[3].filter(
            (d) =>
                d.workflowid === workflowID && d.snapshot_date === '2019-12-01'
        );
        parameters.forEach((parameter) => {
            const customParameter = customParameters.find(
                (customParameter) =>
                    customParameter.workflowid === parameter.workflowid &&
                    customParameter.index === parameter.index
            );
            if (customParameter !== undefined)
                parameter.default = customParameter.value;
        });

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
