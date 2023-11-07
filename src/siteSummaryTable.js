import data from './summary-data.json';

const makeSiteSummaryData = () => {
    data.site_grid_details.map((item, i) => {
        let obj = {
            site_id: item.site_id,
            enrolled_subjects: item.subject_enrolled,
            red_kris: item.at_risk_kri,
            amber_kris: item.flagged_kri,
        };

        item.kri_column_details.map((kriItem, i) => {
            return (kriObj = {
                kriItem,
            });
        });

        return [{ ...obj, ...kriObj }];
    });
};

console.log('result: ', makeSiteSummaryData);
