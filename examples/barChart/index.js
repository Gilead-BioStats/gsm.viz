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
        // data
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        const thresholds = datasets[2].filter((d) => d.param === 'vThreshold');

        // visualization
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];

        const selectedGroupIDs = [
            results[Math.floor(Math.random() * results.length)].groupid,
        ];

        workflow.selectedGroupIDs = selectedGroupIDs;
        const instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow,
            thresholds,
            'score'
        );

        // controls
        kri(workflow, datasets, true);
        site(datasets, true);
        lifecycle(datasets, 'barChart', true);
        download(true);
        threshold(workflow, datasets, true);
        yaxis(workflow, datasets, true);
    });
