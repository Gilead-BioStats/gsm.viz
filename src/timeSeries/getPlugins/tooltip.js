import { ascending } from 'd3';
import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';

export default function tooltip(config) {
    const tooltipAesthetics = getTooltipAesthetics();

    return {
        callbacks: {
            //label: formatResultTooltipContent.bind(null, config),
            label: (d) => {
                const content = formatResultTooltipContent(config, d);

                // prevent display of duplicate tooltip content
                return d.raw.duplicate ? '' : content;
            },
            labelPointStyle: (data) => {
                return {
                    pointStyle: ['line', 'scatter'].includes(data.dataset.type)
                        ? 'circle'
                        : 'rect',
                };
            },
            title: (data) => {
                if (data.length) {
                    // distribution tooltip
                    if (['boxplot', 'violin'].includes(data[0].dataset.type)) {
                        return `${config.group} Distribution on ${data[0].label}`;
                    } else if (data[0].dataset.purpose === 'aggregate') {
                        return `${config.group} Summary on ${data[0].label}`;
                    } else {
                        const datum = data[0].dataset.data[data[0].dataIndex];

                        const numericGroupIDs = data.every((d) =>
                            /^\d+$/.test(d.raw.groupid)
                        );

                        const groupIDs = data
                            .sort((a, b) => {
                                const selected =
                                    config.selectedGroupIDs.includes(
                                        b.raw.groupid
                                    ) -
                                    config.selectedGroupIDs.includes(
                                        a.raw.groupid
                                    );

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
                            ? `${groupIDs.join(', ')} on ${data[0].label}`
                            : `${groupIDs.slice(0, 3).join(', ')} and [ ${
                                  groupIDs.length - 3
                              } ] more on ${data[0].label}`;
                    }
                }
            },
        },
        displayColors: config.dataType !== 'discrete',
        filter: (data) => {
            const datum = data.dataset.data[data.dataIndex];

            // Avoid duplicate display of tooltip.
            return (
                data.dataset.purpose !== 'annotation' &&
                typeof datum === 'object' &&
                !(
                    config.selectedGroupIDs.includes(datum.groupid) &&
                    data.dataset.type === 'scatter'
                )
            );
        },
        ...tooltipAesthetics,
    };
}
