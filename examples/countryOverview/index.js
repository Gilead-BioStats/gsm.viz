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

        const results = datasets[0].filter((d) => regex.test(d.workflowid));
        results.forEach((d) => {
            d.groupid = d.groupid.substring(0, 2).toUpperCase();
        });
        const workflows = datasets[1].filter((d) => regex.test(d.workflowid));
        const sites = datasets[2];
        sites.forEach((d) => {
            d.groupid = d.siteid;
            d.group_label = d.pi_last_name;
        });
        const countries = d3
            .rollups(
                sites,
                (group) => {
                    return {
                        groupid: group[0].country.substring(0, 2).toUpperCase(),
                        group_label: group[0].country,
                        enrolled_participants: d3.sum(
                            group,
                            (d) => d.enrolled_participants
                        ),
                        status: `${
                            group.filter((d) => d.enrolled_participants > 0)
                                .length
                        } sites active`,
                    };
                },
                (d) => d.country
            )
            .map((d) => d[1]);
        console.log(countries);

        let groupMetadata;
        if (groupLevel === 'site') {
            groupMetadata = sites;
        } else if (groupLevel === 'country') {
            groupMetadata = countries;
        }
        console.log(groupMetadata);

        const groupSubset = getCountries(results);
        console.log(groupSubset);

        const instance = rbmViz.default.countryOverview(
            document.getElementById('container'),
            results.filter((d) => groupSubset.includes(d.groupid)),
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
                groupSubset.includes(d.groupid)
            );

            instance.updateTable(updatedResults);
        };
    });
