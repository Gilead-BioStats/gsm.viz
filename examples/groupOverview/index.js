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
        const GroupLevel = 'Site';

        let metricPrefix;
        if (GroupLevel === 'Site') {
            metricPrefix = 'kri';
        } else if (GroupLevel === 'Country') {
            metricPrefix = 'cou';
        } else if (GroupLevel === 'Study') {
            metricPrefix = 'qtl';
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

        const groupLabelKey = {
            Site: 'InvestigatorLastName',
            Country: null,
            Study: 'nickname',
        };

        const groupTooltipKeys = {
            Site: {
                GroupID: 'Investigator ID',
                ParticipantCount: 'Participant Count',
                asdf: 'Site Count',

                InvestigatorLastName: 'Last Name',
                InvestigatorFirstName: 'First Name',
                Status: 'Status',

                site_num: 'Site ID',
                account: 'Site',
                City: 'City',
                State: 'State',
                Country: 'Country',

                site_active_dt: 'Activation Date',
                is_satellite: 'Satellite',
            },
            Country: {
                GroupID: 'Country Code',
                ParticipantCount: 'Participant Count',
                SiteCount: 'Site Count',
            },
            Study: {
                GroupID: 'Protocol ID',
                ParticipantCount: 'Participant Count',
                SiteCount: 'Site Count',
            },
        };

        const instance = rbmViz.default.groupOverview(
            document.getElementById('container'),
            results.filter((d) => groupSubset.includes(d.GroupID)),
            {
                GroupLevel,
                groupLabelKey: groupLabelKey[ GroupLevel ],
                groupTooltipKeys: groupTooltipKeys[ GroupLevel ],
                groupClickCallback: function (datum) {
                    console.log(datum.data.tooltipContent);
                },
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
