const dataFiles = [
    '../../data/results_summary_over_time.csv',
    '../../data/meta_workflow.csv',
    '../../data/meta_param.csv',
    '../../data/status_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^kri/.test(d.workflowid))
        );

        const workflowID = kri(datasets, true);

        // data
        const results = datasets[0].filter((d) => d.workflowid === workflowID);

        // configuration
        const workflow = datasets[1].filter((d) => d.workflowid === workflowID);
        workflow.y = 'score';
        workflow.nSnapshots = 10;
        //workflow.yMin = d3.min(results, d => +d[workflow.y]);
        //workflow.yMax = d3.max(results, d => +d[workflow.y]);

        // threshold annotations
        const parameters = mergeParameters(
            filterOnWorkflowID(datasets[2], workflowID),
            filterOnWorkflowID(datasets[3], workflowID)
        );

        // loop over group IDs
        const groupids = [...new Set(datasets[0].map((d) => d.groupid))];
        for (const i in groupids) {
            const groupid = groupids[i];

            // container
            const container = document.getElementById('container');
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${i}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';

            // display
            const instance = rbmViz.default.sparkline(
                subcontainer,
                results.filter((d) => d.groupid === groupid),
                workflow,
                parameters
            );
        }
    });
