const dataFiles = [
    '../../data/flag_counts_by_group.csv',
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
        const groupIDs = [...new Set(flagCounts.map((d) => d.groupid))];
        const container = document.getElementById('container');

        for (const groupID of groupIDs) {
            // container
            const subcontainer = document.createElement('div');
            subcontainer.id = `container_${groupID}`;
            container.appendChild(subcontainer);
            subcontainer.style.display = 'inline-block';

            // data
            const data = flagCounts.filter((d) => d.groupid === groupID);

            // configuration
            const config = {};
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
