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
        const groupLevel = 'country';

        let workflowPrefix;
        if (groupLevel === 'site') {
            workflowPrefix = 'kri';
        } else if (groupLevel === 'country') {
            workflowPrefix = 'cou';
        }

        const regex = new RegExp(`^${workflowPrefix}`);

        const results = datasets[0].filter((d) => regex.test(d.MetricID));
        results.forEach((d) => {
            d.GroupID = d.GroupID.substring(0, 2).toUpperCase();
        });
        const workflows = datasets[1].filter((d) => regex.test(d.MetricID));
        const sites = datasets[2];
        sites.forEach((d) => {
            d.groupid = d.SiteID;
            d.group_label = d.pi_last_name;
        });
        const countries = d3
            .rollups(
                sites,
                (group) => {
                    return {
                        GroupID: group[0].country.substring(0, 2).toUpperCase(),
                        GroupLabel: group[0].country,
                        EnrolledParticipants: d3.sum(
                            group,
                            (d) => d.enrolled_participants
                        ),
                        Status: `${
                            group.filter((d) => d.enrolled_participants > 0)
                                .length
                        } sites active`,
                    };
                },
                (d) => d.country
            )
            .map((d) => d[1]);

        let groupMetadata;
        if (groupLevel === 'site') {
            groupMetadata = sites;
        } else if (groupLevel === 'country') {
            groupMetadata = countries;
        }

        const groupSubset = getCountries(results);

        const instance = rbmViz.default.groupOverview(
            document.getElementById('container'),
            results.filter((d) => groupSubset.includes(d.GroupID)),
            {
                groupLevel,
                groupClickCallback: function (datum) {
                    console.table(datum);
                },
                metricClickCallback: function (datum) {
                    console.table(datum);
                },
            },
            groupMetadata,
            workflows
        );

        document.querySelector('#country-subset').onchange = function () {
            const groupSubset = getCountries(results);
            const updatedResults = results.filter((d) =>
                groupSubset.includes(d.GroupID)
            );

            instance.updateTable(updatedResults);
        };
    });
