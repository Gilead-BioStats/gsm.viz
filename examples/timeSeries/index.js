const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/flag_counts_by_kri.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        workflow.y = 'n_flagged';
        const flagCounts = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            flagCounts,
            workflow
        );
    });
