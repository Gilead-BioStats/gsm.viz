const dataFiles = [
    '../data/results.csv',
    '../data/metricMetadata.csv',
    '../data/groupMetadata.csv',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.text())
);

Promise.all(dataPromises)
    .then((texts) => texts.map((text) => d3.csvParse(text)))
    .then((datasets) => {
        const GroupLevel = 'Country';

        let metricPrefix;
        if (GroupLevel === 'Site') {
            metricPrefix = 'kri';
        } else if (GroupLevel === 'Country') {
            metricPrefix = 'cou';
        }

        const regex = new RegExp(`^${metricPrefix}`);

        const SnapshotDate = d3.max(datasets[0], d => d.SnapshotDate);
        datasets[0] = datasets[0].filter(
            d => d.SnapshotDate === SnapshotDate
        );
        const results = datasets[0].filter((d) => regex.test(d.MetricID));
        const metricMetadata = datasets[1].filter((d) => regex.test(d.MetricID));
        const groupMetadata = datasets[2];
        const groupSubset = getGroups(results);

        const instance = rbmViz.default.groupOverview(
            document.getElementById('container'),
            results.filter((d) => groupSubset.includes(d.GroupID)),
            {
                GroupLevel,
                //groupClickCallback: function (datum) {
                //    console.log(datum);
                //},
                //metricClickCallback: function (datum) {
                //    console.log(datum);
                //},
            },
            groupMetadata,
            metricMetadata
        );

        document.querySelector('#group-subset').onchange = function () {
            const groupSubset = getGroups(results);
            const updatedResults = results.filter((d) =>
                groupSubset.includes(d.GroupID)
            );

            instance.updateTable(updatedResults);
        };
    });
