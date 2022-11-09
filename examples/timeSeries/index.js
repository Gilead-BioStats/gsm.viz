const dataFiles = [
    '../data/meta_workflow.csv',
    //'../data/flag_counts_by_group.csv',
    '../data/flag_counts_by_kri.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        //const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
        //    .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        //workflow.y = 'n_at_risk_or_flagged';
        //workflow.selectedGroupIDs = '173';
        const workflow = {
            y: 'n_at_risk_or_flagged',
            //selectedGroupIDs: '173',
        };

        const flagCounts = datasets[1];
        flagCounts.forEach((d) => {
            d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
        });

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            flagCounts,
            workflow
        );
    });
