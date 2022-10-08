const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
    '../data/results_bounds.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment that retrieves first workflow ID
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        const bounds = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // configuration
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        workflow.selectedGroupIDs = [
            results[Math.floor(Math.random() * results.length)].groupid,
        ];

        // visualization
        const instance = rbmViz.default.scatterPlot(
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );
        //const duplicate = rbmViz.default.scatterPlot(
        //    document.getElementById('container'),
        //    results,
        //    workflow,
        //    bounds
        //);

        //d3.timeout(() => {
        //console.log(instance);
        //console.log(instance.canvas);
        //console.log(instance.data);
        //console.log(instance.canvas.chart);

        // Add event listener to KRI dropdown.
        kri(workflow, datasets, true);

        // Add event listener to highlight sites.
        site(datasets, true);

        // Add event listener to x-axis type toggle.
        xAxisType(true);

        // Add event listener to chart lifecycle button.
        lifecycle(datasets, true);

        // Add event listener to download button.
        download(true);
        //}, 250);
    });
