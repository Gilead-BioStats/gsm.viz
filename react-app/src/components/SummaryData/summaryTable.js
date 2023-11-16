export default function makeSiteSummaryData(data) {
    const siteSummaryData = data.site_grid_details.map((item, i) => {
        let obj = {
            site_data: {
                site_id: item.site_id,
                ...item.site_id_details
            },
            enrolled_subjects: item.subject_enrolled,
            red_kris: item.at_risk_kri,
            amber_kris: item.flagged_kri,
        };

        // Define an object with KRIs for keys and flags for values.
        let kriObj = item.kri_column_details
            .sort((a,b) => (
                Object.keys(a) < Object.keys(b) ? -1 :
                Object.keys(b) < Object.keys(a) ?  1 : 0
            ))
            .reduce((kriItems, kriItem, i) => {
                // kriItems[Object.keys(kriItem)] = kriItem[Object.keys(kriItem)].flag_value;
                kriItems[Object.keys(kriItem)] = kriItem[Object.keys(kriItem)];
                return kriItems;
            }, {});

        return { ...obj, ...kriObj };
    });

    return(siteSummaryData)
};
