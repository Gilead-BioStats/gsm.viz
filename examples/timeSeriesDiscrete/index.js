const by = 'kri'; // 'kri'

const dataFiles = [
    `../data/flag_counts_by_${by}.csv`,
    '../data/meta_workflow.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        // data
        datasets[0].forEach((d) => {
            d.n_at_risk_or_flagged = +d.n_at_risk + +d.n_flagged;
        });
        let flagCounts = datasets[0];
        if (by === 'kri')
            flagCounts = flagCounts.filter((d) => d.workflowid === workflowID);

        // config
        const config =
            by === 'kri'
                ? {
                      ...datasets[1].find(
                          (workflow) => workflow.workflowid === workflowID
                      ),
                    //discreteUnit: 'Country',
                  }
                : {
                      selectedGroupIDs: '173',
                  };
        config.y = 'n_at_risk_or_flagged';

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            flagCounts,
            config
        );

        if (by === 'kri') kri(config, datasets, true);
        else
            document.getElementById('kri').parentElement.style.display = 'none';

        if (by === 'group') site(datasets, true);
        else
            document.getElementById('groupid').parentElement.style.display =
                'none';
    });
