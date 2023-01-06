const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/status_param.csv',
    '../data/flag_counts_by_kri.csv',
    '../data/flag_counts_by_group.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowIDs = d3
            .range(12)
            .map((i) => 'kri' + d3.format('04d')(i + 1));
        const workflowID =
            workflowIDs[Math.floor(workflowIDs.length * Math.random())];

        // continuous outcome: KRI results
        let results = filterOnWorkflowID(datasets[0], workflowID);

        const groupIDs = [...new Set(results.map((d) => d.groupid))];
        const groupID = groupIDs[Math.floor(groupIDs.length * Math.random())];
        results = results.filter((d) => d.groupid === groupID);

        // discrete outcome: flag counts by KRI
        const flagCountsByKRI = datasets[4].filter(
            (d) => d.workflowid === workflowID
        );
        flagCountsByKRI.forEach((d) => {
            d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
        });

        // discrete outcome: flag counts by group
        const flagCountsByGroup = datasets[5].filter(
            (d) => d.groupid === groupID
        );
        flagCountsByGroup.forEach((d) => {
            d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
        });

        // configuration
        const workflow = filterOnWorkflowID(datasets[1], workflowID);
        workflow.nSnapshots = 25;

        // threshold annotations
        const parameters = mergeParameters(
            filterOnWorkflowID(datasets[2], workflowID),
            filterOnWorkflowID(datasets[3], workflowID)
        );

        // continuous ouutcomes
        rbmViz.default.sparkline(
            document.getElementById('score'),
            results,
            {
                ...workflow,
                y: 'score',
            },
            parameters
        );

        rbmViz.default.sparkline(document.getElementById('metric'), results, {
            ...workflow,
            y: 'metric',
        });

        // discrete outcomes
        const discreteOutcomes = [
            'n_at_risk',
            'n_flagged',
            'n_at_risk_or_flagged',
        ];
        rbmViz.default.sparkline(
            document.getElementById('flag-counts-by-kri'),
            flagCountsByKRI,
            {
                nSnapshots: workflow.nSnapshots,
                y: discreteOutcomes[
                    Math.floor(discreteOutcomes.length * Math.random())
                ],
            }
        );

        rbmViz.default.sparkline(
            document.getElementById('flag-counts-by-group'),
            flagCountsByGroup,
            {
                nSnapshots: workflow.nSnapshots,
                y: discreteOutcomes[
                    Math.floor(discreteOutcomes.length * Math.random())
                ],
            }
        );
    });
