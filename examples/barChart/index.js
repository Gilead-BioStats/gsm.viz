const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
    '../data/meta_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        // data
        const results = datasets[1].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[0].find((d) => d.workflowid === workflowID);
        workflow.y = 'score';
        workflow.thresholds = [-3,-2,2,3];
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        workflow.selectedGroupIDs =
            results[Math.floor(Math.random() * results.length)].groupid;

        // threshold annotations
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflowID
        );

        // visualization
        const instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow,
            //parameters
        );

        // controls
        kri(workflow, datasets, true);
        site(datasets, true);
        yaxis(workflow, datasets, true);
        threshold(workflow, datasets, true);
        lifecycle(datasets, 'barChart', true);
        download(true);
    });
