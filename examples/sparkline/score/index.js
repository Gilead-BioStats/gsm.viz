const dataFiles = [
    '../../data/results_summary_over_time.csv',
    '../../data/meta_workflow.csv',
    '../../data/meta_param.csv',
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

        const workflowid = kri(datasets, true);

        // data
        const groupids = [...new Set(datasets[0].map((d) => d.groupid))];
        const results = datasets[0].filter(
            (d) => d.workflowid === workflowid && groupids.includes(d.groupid)
        );

        // configuration
        const workflow = datasets[1].filter((d) => d.workflowid === workflowid);
        workflow.y = 'score';
        workflow.nSnapshots = 25;

        // threshold annotations
        const parameters = datasets[2].filter(
            (d) => d.workflowid === workflowid
        );

        // loop over group IDs
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
