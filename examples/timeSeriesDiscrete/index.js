const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/flag_counts_by_group.csv',
    //'../data/flag_counts_by_kri.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        // data
        const workflow = {
            y: 'n_at_risk_or_flagged',
            selectedGroupIDs: '173',
        };

        const flagCounts = datasets[1];
        //.filter(
        //    d => d.workflowid === workflowID
        //);
        flagCounts.forEach((d) => {
            d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
        });

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            flagCounts,
            workflow
        );

        site(datasets, true);
    });
