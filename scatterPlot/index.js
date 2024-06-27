const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/results_bounds.csv',
    '../data/status_site.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const MetricID = 'kri0001';

        datasets = datasets.map((dataset) =>
            Object.keys(dataset[0]).includes('MetricID')
                ? dataset.filter((d) => /^kri/.test(d.MetricID))
                : dataset
        );

        // analysis results
        const results = filterOnMetricID(datasets[0], MetricID);

        // chart configuration
        const config = selectMetricID(datasets[1], MetricID);
        config.hoverCallback = function (datum) {
            //console.log(datum.GroupID);
        };
        config.clickCallback = function (datum) {
            instance.data.config.selectedGroupIDs = datum.GroupID;
            instance.data.config.xType = xAxisType();
            instance.helpers.updateConfig(instance, instance.data.config);
            document.querySelector('#group').value = datum.GroupID;
        };

        // Threshold annotations
        const bounds = filterOnMetricID(datasets[2], MetricID);

        // group metadata
        const groupMetadata = datasets[3];

        // visualization
        const instance = rbmViz.default.scatterPlot(
            document.getElementById('container'),
            results,
            config,
            bounds,
            groupMetadata
        );

        // controls
        metric(MetricID, datasets, true);
        group(datasets, true);
        country(datasets, true);
        xAxisType(true);
        lifecycle(datasets, 'scatterPlot', true);
        download(true);
    });
