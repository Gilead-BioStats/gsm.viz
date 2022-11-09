import formatResultTooltipContent from '../../util/formatResultTooltipContent';

export default function tooltip(config) {
    return {
        callbacks: {
            label: formatResultTooltipContent.bind(null, config),
            title: () => null,
        },
        //custom: function (tooltipModel) {
        //    // EXTENSION: filter is not enough! Hide tooltip frame
        //    if (!tooltipModel.body || tooltipModel.body.length < 1) {
        //        tooltipModel.caretSize = 0;
        //        tooltipModel.xPadding = 0;
        //        tooltipModel.yPadding = 0;
        //        tooltipModel.cornerRadius = 0;
        //        tooltipModel.width = 0;
        //        tooltipModel.height = 0;
        //    }
        //},
        filter: (data) => {
            const datum = data.dataset.data[data.dataIndex];

            return !(
                config.selectedGroupIDs.includes(datum.groupid) &&
                data.dataset.type === 'scatter'
            );
        },
    };
}
