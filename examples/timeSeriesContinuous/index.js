const dataFiles = [
    '../data/results_summary_over_time.csv',
    '../data/meta_workflow.csv',
    '../data/status_site_over_time.csv',
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
        config.y = 'Score';
        config.hoverCallback = function (datum) {
            //console.log(datum.GroupID);
        };
        config.clickCallback = function (datum) {
            instance.helpers.updateSelectedGroupIDs(datum.GroupID);
            document.querySelector('#GroupID').value = datum.GroupID;
        };

        // Threshold annotations
        const thresholds = config.Thresholds.split(',').map((d) => +d);

        // group metadata
        const groupMetadata = datasets[2];

        // visualization
        const instance = rbmViz.default.timeSeries(
            document.getElementById('container'),
            results,
            config,
            thresholds,
            null,
            groupMetadata
        );

        metric(config, datasets, true);
        group(datasets, true);
        yAxis(config, datasets, true);
        download(true);
    });
