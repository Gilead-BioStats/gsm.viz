import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';
import { ascending } from 'd3';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();

    return {
        callbacks: {
            label: (d) => {
                const content = formatResultTooltipContent(config, d);

                // prevent display of duplicate tooltip content
                return d.raw.duplicate ? '' : content;
            },
            title: (data) => {
                if (data.length) {
                    const numericGroupIDs = data.every((d) =>
                        /^\d+$/.test(d.raw.groupid)
                    );

                    const groupIDs = data
                        .sort((a, b) => {
                            const selected =
                                config.selectedGroupIDs.includes(
                                    b.raw.groupid
                                ) -
                                config.selectedGroupIDs.includes(a.raw.groupid);

                            const alphanumeric = numericGroupIDs
                                ? ascending(+a.raw.groupid, +b.raw.groupid)
                                : ascending(a.raw.groupid, b.raw.groupid);

                            return selected || alphanumeric;
                        })
                        .map((d, i) =>
                            i === 0
                                ? `${config.group}${
                                      data.length > 1 ? 's' : ''
                                  } ${d.dataset.data[d.dataIndex].groupid}`
                                : d.dataset.data[d.dataIndex].groupid
                        );

                    return groupIDs.length <= 4
                        ? groupIDs.join(', ')
                        : `${groupIDs.slice(0, 3).join(', ')} and ${
                              groupIDs.length - 3
                          } more`;
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
