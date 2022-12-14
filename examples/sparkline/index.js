const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/flag_counts_by_kri.csv',
    '../data/flag_counts_by_group.csv',
    '../data/meta_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';
        const groupID = '28';
        const results = datasets[0]
            .filter((d) => d.workflowid === workflowID && d.groupid === groupID)
            .slice(35, 45);
        const workflow = datasets[1].find((d) => d.workflowid === workflowID);
        workflow.nSnapshots = 10;
        const flagCountsByKRI = datasets[2].filter(
            (d) => d.workflowid === workflowID
        );
        const flagCountsByGroup = datasets[3].filter(
            (d) => d.groupid === groupID
        );

        rbmViz.default.sparkline(
            document.getElementById('score'),
            results,
            {
                ...workflow,
                y: 'score',
            },
            datasets[4].filter((d) => d.workflowid === workflowID)
        );

        rbmViz.default.sparkline(document.getElementById('metric'), results, {
            ...workflow,
            y: 'metric',
        });

        rbmViz.default.sparkline(
            document.getElementById('flag-counts-by-kri'),
            flagCountsByKRI,
            {
                nSnapshots: workflow.nSnapshots,
                y: 'n_flagged',
            }
        );

        rbmViz.default.sparkline(
            document.getElementById('flag-counts-by-group'),
            flagCountsByGroup,
            {
                nSnapshots: workflow.nSnapshots,
                y: 'n_flagged',
            }
        );
    });
