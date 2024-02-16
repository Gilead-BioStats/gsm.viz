import { ascending } from 'd3';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';
import formatResultTooltipContent from '../../util/formatResultTooltipContent';

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
                        .map((d, i) => {
                            const site = d.raw.site;
                            let title;

                            if (data.length === 1) {
                                title = `${config.group} ${d.dataset.data[d.dataIndex].groupid}`;

                                if (site !== undefined) {
                                    title = `${title} (${site.pi_last_name})`;
                                }
                            } else {
                                title = i === 0
                                    ? `${config.group}s ${d.dataset.data[d.dataIndex].groupid}`
                                    : d.dataset.data[d.dataIndex].groupid;
                            }

                            return title;
                        });

                    const title = groupIDs.length <= 4
                        ? groupIDs.join(', ')
                        : `${groupIDs.slice(0, 3).join(', ')} and [ ${
                              groupIDs.length - 3
                          } ] more`

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
