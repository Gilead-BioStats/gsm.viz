const dataFiles = [
    '../data/results_summary.csv',
    '../data/meta_workflow.csv',
    '../data/status_site.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const groupLevel = 'site';

        let metricPrefix;
        if (groupLevel === 'site') {
            metricPrefix = 'kri';
        } else if (groupLevel === 'country') {
            metricPrefix = 'cou';
        }

        const regex = new RegExp(`^${metricPrefix}`);

        const results = datasets[0].filter((d) => regex.test(d.MetricID));
        const metrics = datasets[1].filter((d) => regex.test(d.MetricID));
        const groupMetadata = datasets[2];
        const groupSubset = getGroups(results);

        const instance = rbmViz.default.siteOverview(
            document.getElementById('container'),
            results.filter((d) => groupSubset.includes(d.GroupID)),
            {
                groupLevel,
                //groupClickCallback: function (datum) {
                //    console.log(datum);
                //},
                //metricClickCallback: function (datum) {
                //    console.log(datum);
                //},
            },
            groupMetadata,
            metrics
        );

        document.querySelector('#group-subset').onchange = function () {
            const siteSubset = getGroups(results);
            const updatedResults = results.filter((d) =>
                siteSubset.includes(d.GroupID)
            );

            instance.updateTable(updatedResults);
        };
    });
