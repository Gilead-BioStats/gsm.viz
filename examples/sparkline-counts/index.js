const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary_over_time.csv',
    //'../data/flag_summary_over_time.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // configuration
        const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        workflow.groupid = datasets[1][Math.floor(Math.random()*datasets[1].length)].groupid;
        console.log(workflow.groupid);
        //workflow.y = 'score';
        workflow.y = 'site'; // 'kri'

        // data
        const results = (
            workflow.y === 'site'
                ? datasets[1].filter(
                    (d) => d.workflowid === workflow.workflowid
                ) : workflow.y === 'kri'
                ? datasets[1].filter(
                    (d) => d.groupid === workflow.groupid
                ) : datasets[1].filter(
                    (d) => d.workflowid === workflow.workflowid && d.groupid === workflow.groupid
                )
        );

        // visualization
        const container = document.getElementById('container');
        const subcontainer = document.createElement('div');
        container.appendChild(subcontainer);
        subcontainer.style.display = 'inline-block';
        const instance = rbmViz.default.sparkline(
            subcontainer,
            results,
            workflow
        );

        // controls
        //kri(workflow, datasets, true);
        //site(datasets, true);
        //xAxisType(true);
        //lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
