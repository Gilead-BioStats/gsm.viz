import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';
import sortByGroupID from '../../util/sortByGroupID';

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
                    const dataSorted = sortByGroupID(data, config);

                    const titles = dataSorted.map((d, i) => {
                        let title;

                        if (data.length === 1) {
                            title = `${config.group} ${
                                d.dataset.data[d.dataIndex].groupid
                            }`;

                            if (d.raw.site !== undefined) {
                                title = `${title} (${d.raw.site.pi_last_name} / ${d.raw.site.enrolled_participants} enrolled)`;
                            }
                        } else {
                            title =
                                i === 0
                                    ? `${config.group}s ${
                                          d.dataset.data[d.dataIndex].groupid
                                      }`
                                    : d.dataset.data[d.dataIndex].groupid;
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
