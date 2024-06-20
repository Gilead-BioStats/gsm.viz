const dataFiles = [
    '../../data/flag_counts_by_kri.csv',
    '../../data/meta_workflow.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const flagCounts = datasets[0];
        const workflows = datasets[1];
        const workflowIDs = [...new Set(flagCounts.map((d) => d.MetricID))];
        const container = document.getElementById('container');

        for (const workflowID of workflowIDs) {
            // container
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${workflowID}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';

            // data
            const data = flagCounts.filter((d) => d.MetricID === workflowID);
            data.forEach((d) => {
                d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
            });

            // configuration
            const config = workflows.find(
                (workflow) => workflow.MetricID === workflowID
            );
            config.x = 'SnapshotDate';
            config.y = 'n_at_risk_or_flagged';
            config.color = null;
            config.nSnapshots = 25;

            const instance = rbmViz.default.sparkline(
                subcontainer,
                data,
                config
            );
        }
    });
