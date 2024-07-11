import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';
import formatMetricTooltip from '../../util/formatMetricTooltip.js';
import sortByGroupID from '../../util/sortByGroupID.js';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();

    return {
        callbacks: {
            label: (d) => {
                const content = formatMetricTooltip(d.raw, config);

                // prevent display of duplicate tooltip content
                return d.raw.duplicate ? '' : content;
            },
            title: (data) => {
                if (data.length) {
                    const dataSorted = sortByGroupID(data, config);

                    const titles = dataSorted.map((d, i) => {
                        let title;

                        if (data.length === 1) {
                            title = `${config.GroupLevel}: ${
                                d.dataset.data[d.dataIndex].GroupID
                            }`;

                            if (d.raw.group !== undefined) {
                                title = `${title} (${d.raw.group.GroupLabel} / ${d.raw.group.ParticipantCount} enrolled)`;
                            }
                        } else {
                            title =
                                i === 0
                                    ? `${config.GroupLevel}s ${
                                          d.dataset.data[d.dataIndex].GroupID
                                      }`
                                    : d.dataset.data[d.dataIndex].GroupID;
                        }

                        return title;
                    });

                    const title =
                        titles.length <= 4
                            ? titles.join(', ')
                            : `${titles.slice(0, 3).join(', ')} and [ ${
                                  titles.length - 3
                              } ] more`;

                    return title;
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
