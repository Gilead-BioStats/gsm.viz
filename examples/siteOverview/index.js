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

        let workflowPrefix;
        if (groupLevel === 'site') {
            workflowPrefix = 'kri';
        } else if (groupLevel === 'country') {
            workflowPrefix = 'cou';
        }

        const regex = new RegExp(`^${workflowPrefix}`);

        const results = datasets[0].filter((d) => regex.test(d.workflowid));
        const workflows = datasets[1].filter((d) => regex.test(d.workflowid));
        const sites = datasets[2];

        const instance = rbmViz.default.siteOverview(
            document.getElementById('container'),
            results,
            {
                groupLevel,
                //groupClickCallback: function (datum) {
                //    console.log(datum);
                //},
                //metricClickCallback: function (datum) {
                //    console.log(datum);
                //},
            },
            sites,
            workflows
        );
    });
