const dataFiles = [
    '../data/site-summary-details.json',
];

const dataPromises = dataFiles.map((dataFile) =>
    fetch(dataFile).then((response) => response.json())
);

Promise.all(dataPromises)
    .then((datasets) => {
        const siteSummaryDetails = datasets[0];

        console.log('--- siteSummaryTable methods ---');
        console.log(Object.keys(rbmViz.default.siteSummaryTable));

        const siteSummaryData = rbmViz.default.siteSummaryTable.makeSiteSummaryData(
            siteSummaryDetails
        );

        console.log('--- site summary data ---');
        console.table(siteSummaryData);

        //const columnDefs = rbmViz.default.siteSummaryTable.getColumnDefs(
        //    siteSummaryDetails
        //);

        const columnHelper = TableCore.createColumnHelper();
        const columnDefs = Object.keys(siteSummaryData[0]).reduce((acc, curr, i) => {
            acc[ curr ] = columnHelper.accessor(curr);

            return(acc);
        }, {});

        console.log('--- column defs ---');
        console.table(columnDefs);

        const table = TableCore.createTable({
            columns: columnDefs,
            data: siteSummaryData
        });

        console.log(table);
        console.log(table.getHeaderGroups());
    });
