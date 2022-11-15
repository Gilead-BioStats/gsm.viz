import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();

    return {
        callbacks: {
            label: formatResultTooltipContent.bind(null, config),
            title: (data) => {
                if (data.length) {
                    const groupIDs = data.map(
                        (d, i) => d.dataset.data[d.dataIndex].groupid
                    );

                    return data
                        .map(
                            (d, i) =>
                                `${config.group} ${
                                    d.dataset.data[d.dataIndex].groupid
                                }`
                        )
                        .join(', ');
                }
            },
        },
        custom: function (tooltipModel) {
            // EXTENSION: filter is not enough! Hide tooltip frame
            if (!tooltipModel.body || tooltipModel.body.length < 1) {
                tooltipModel.caretSize = 0;
                tooltipModel.xPadding = 0;
                tooltipModel.yPadding = 0;
                tooltipModel.cornerRadius = 0;
                tooltipModel.width = 0;
                tooltipModel.height = 0;
            }
        },
        filter: (data) => data.dataset.type !== 'line', // turns off tooltip for bounds
        ...tooltipAesthetics,
    };
}
