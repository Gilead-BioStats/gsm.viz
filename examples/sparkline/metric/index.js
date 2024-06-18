const dataFiles = [
    '../../data/results_summary_over_time.csv',
    '../../data/meta_workflow.csv',
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
        const GroupIDs = [...new Set(datasets[0].map((d) => d.GroupID))];
        const results = datasets[0].filter(
            (d) => d.workflowid === workflowid && GroupIDs.includes(d.GroupID)
        );

        // configuration
        const workflow = datasets[1].find((d) => d.workflowid === workflowid);
        workflow.y = 'metric';
        workflow.nSnapshots = 25;

        // loop over group IDs
        for (const i in GroupIDs) {
            const GroupID = GroupIDs[i];

            // container
            const container = document.getElementById('container');
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${i}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';

            // display
            const instance = rbmViz.default.sparkline(
                subcontainer,
                results.filter((d) => d.GroupID === GroupID),
                workflow
            );
        }
    });
