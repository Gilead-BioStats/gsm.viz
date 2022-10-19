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
        // configuration
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));

        // bar data
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        ); //.filter(() => Math.random() < .25);

        // threshold annotations
        const thresholds = datasets[2].filter((d) => d.param === 'vThreshold');

        // custom settings
        workflow.y = 'score'; //'metric';
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        const selectedGroupIDs =
            results[Math.floor(Math.random() * results.length)].groupid;
        //workflow.selectedGroupIDs = selectedGroupIDs;

        // visualization
        const instance = rbmViz.default.barChart(
            document.getElementById('container'),
            results,
            workflow,
            datasets[2] //thresholds
        );

        // controls
        kri(workflow, datasets, true);
        site(datasets, true);
        lifecycle(datasets, 'barChart', true);
        download(true);
        threshold(workflow, datasets, true);
        yaxis(workflow, datasets, true);
    });
