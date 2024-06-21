const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/status_param_over_time.csv',
    '../data/status_site_over_time.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const workflowID = 'kri0001';

        datasets = datasets.map((dataset) =>
            Object.keys(dataset[0]).includes('workflowid')
                ? dataset.filter((d) => /^kri/.test(d.workflowid))
                : dataset
        );

        // analysis results
        const results = filterOnWorkflowID(datasets[0], workflowID);

        // chart configuration
        const workflow = selectWorkflowID(datasets[1], workflowID);
        workflow.y = 'score';
        workflow.hoverCallback = function (datum) {
            //console.log(datum.groupid);
        };
        workflow.clickCallback = function (datum) {
            instance.helpers.updateSelectedGroupIDs(datum.groupid);
            document.querySelector('#groupid').value = datum.groupid;
        };

        // threshold annotations
        const parameters = mergeParameters(
            filterOnWorkflowID(datasets[2], workflowID),
            filterOnWorkflowID(datasets[3], workflowID)
        );

        // site metadata
        const sites = datasets[4];

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            workflow,
            parameters, //.filter(parameter => parameter.snapshot_date === parameters[0].snapshot_date),
            null,
            sites
        );

        kri(workflow, datasets, true);
        site(datasets, true);
        yaxis(workflow, datasets, true);
        download(true);
    });
