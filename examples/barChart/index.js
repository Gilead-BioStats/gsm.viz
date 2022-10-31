const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
    '../data/meta_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text, d3.autoType)))
    .then((datasets) => {
        // configuration
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        workflow.y = 'score';

        // bar data
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // threshold annotations
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

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
