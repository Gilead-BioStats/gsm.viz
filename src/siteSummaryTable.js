import summaryData from './summary-data.json' assert { type: "json" };

const makeSiteSummaryData = (data) => {
    return(
        data.site_grid_details.map((item, i) => {
            let obj = {
                site_id: item.site_id,
                enrolled_subjects: item.subject_enrolled,
                red_kris: item.at_risk_kri,
                amber_kris: item.flagged_kri,
            };

            let kriObj = item.kri_column_details
                // TODO: sort from kri0001 to kri0012
                .sort((a,b) => (
                    a[Object.keys(a)] < b[Object.keys(b)] ? -1 :
                    b[Object.keys(b)] < a[Object.keys(a)] ?  1 : 0
                ))
                .reduce((kriItems, kriItem, i) => {
                    kriItems[Object.keys(kriItem)] = kriItem[Object.keys(kriItem)].flag_value;
                    return kriItems;
                }, {});

            return { ...obj, ...kriObj };
        })
    );
};

console.log('result: ', makeSiteSummaryData(summaryData));
