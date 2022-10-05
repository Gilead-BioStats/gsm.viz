const dataFiles = [
    '../data/meta_workflow.csv',
    '../data/results_summary.csv',
    '../data/results_bounds_long.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        // data
        const [workflow] = datasets[0] // destructured assignment
            .sort((a, b) => d3.ascending(a.workflowid, b.workflowid));
        const results = datasets[1].filter(
            (d) => d.workflowid === workflow.workflowid
        );
        const bounds = datasets[2].filter(
            (d) => d.workflowid === workflow.workflowid
        );

        // visualization
        //workflow.maintainAspectRatio = false;
        const groupIDs = [
            ...new Set(results.map((result) => result.groupid)).values(),
        ];
        workflow.selectedGroupIDs = [
            results[Math.floor(Math.random() * results.length)].groupid,
        ];
        let instance = rbmViz.default.scatterPlot(
            document.getElementById('container'),
            results,
            workflow,
            bounds
        );
        console.log(instance.canvas);

        // Add event listener to KRI dropdown.
        kri(workflow, datasets, instance, true);

        // Add event listener to highlight sites.
        site(datasets, instance, true);

        // Add event listener to x-axis type toggle.
        xAxisType(instance, true);

        // Add event listener to chart lifecycle button.
        lifecycle(instance, datasets, true);

        // Add event listener to download button.
        download(instance, true);
    });
