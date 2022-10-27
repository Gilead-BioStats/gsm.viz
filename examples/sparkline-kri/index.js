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
        const workflows = datasets[0];
        const flagCounts = datasets[1];
        const workflowIDs = [...new Set(flagCounts.map(d => d.workflowid))];
        const container = document.getElementById('container');

        for (const workflowID of workflowIDs) {
            // container
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${workflowID}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';

            // data
            const data = flagCounts
                .filter(d => d.workflowid === workflowID);

            // configuration
            const config = workflows
                .find(workflow => workflow.workflowid === workflowID);
            config.x = 'snapshot_date';
            config.y = 'n_flagged';
            config.color = null;
            config.nSnapshots = 25;

            const instance = rbmViz.default.sparkline(
                subcontainer,
                data,
                config
            );
        }
    });
