const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/meta_param.csv',
    '../data/status_param.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        datasets = datasets.map((dataset) =>
            dataset.filter((d) => /^kri/.test(d.workflowid))
        );

        // TODO:
        // - add multiply function
        // - add multiple-specific hover callback
        // - add multiple-specific click callback
        // - display table of a single group's data below multiples?
        const multipleContainer = document.getElementById('multiple-container');
        const onHover = function(datum) {
            const canvases = multipleContainer
                .getElementsByTagName('canvas');

            for (const canvas of canvases) {
                const chart = canvas.chart;

                // Update initial config.
                chart.data._config_.selectedGroupIDs = [datum.groupid];

                // Need to update data (?) because selected group ID is highlighted with a
                // scriptable (in src/barChart/structureData/scriptableOptions/backgroundColor.js.
                chart.helpers.updateData(
                    chart,
                    chart.data._data_, // initial data
                    chart.data._config_, // initial config
                    chart.data._thresholds_, // initial thresholds
                    false
                );
            }
        };

        datasets[1].forEach((workflow) => {
            const workflowID = workflow.workflowid;

            // analysis results
            const results = filterOnWorkflowID(datasets[0], workflowID);

            // chart configuration
            workflow.y = 'score';
            workflow.hoverCallback = onHover;
            workflow.displayTitle = true;

            // threshold annotations
            const parameters = mergeParameters(
                filterOnWorkflowID(datasets[2], workflowID),
                filterOnWorkflowID(datasets[3], workflowID)
            );

            const element = document.createElement('div');
            element.className = 'multiple';
            element.id = 'multiple-' + workflowID;
            multipleContainer.appendChild(element);

            // visualization
            const instance = rbmViz.default.barChart(
                element,
                results,
                workflow,
                parameters
            );
        });

        // controls
        //kri(workflow, datasets, true);
        //site(datasets, true);
        //yaxis(workflow, datasets, true);
        //threshold(workflow, datasets, true);
        //lifecycle(datasets, 'barChart', true);
        //download(true);
    });
