import { ascending } from 'd3';
import formatResultTooltipContent from '../../util/formatResultTooltipContent';
import getTooltipAesthetics from '../../util/getTooltipAesthetics';
import sortByGroupID from '../../util/sortByGroupID';

// TODO: figure out better approach to coincidental highlight and site aggregate distribution
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
                        const dataSorted = sortByGroupID(data);

                        const titles = dataSorted
                            .map(function (d, i) {
                                let title;

                                // first element at coordinates
                                console.log(d);
                                if (i === 0) {
                                    if (data.length > 1) {
                                        // multiple elements at coordinates
                                        if (
                                            data.length === 2 &&
                                            data.some((d) =>
                                                [
                                                    'aggregate',
                                                    'distribution',
                                                ].includes(d.dataset.purpose)
                                            )
                                        ) {
                                            // two elements at coordinates: selected group ID and distribution or aggregate
                                            title = `${config.group} ${d.dataset.data[d.dataIndex].groupid}`;
                                        } else {
                                            title = `${config.group}s ${d.dataset.data[d.dataIndex].groupid}`;
                                        }
                                    } else {
                                        title = `${config.group} ${d.dataset.data[d.dataIndex].groupid}`;

                                        if (d.raw.site !== undefined) {
                                            title = `${title} (${d.raw.site.pi_last_name} / ${d.raw.site.enrolled_participants} enrolled)`;
                                        }
                                    }
                                } else if (
                                    !['aggregate', 'distribution'].includes(
                                        d.dataset.purpose
                                    )
                                ) {
                                    title = d.dataset.data[d.dataIndex].groupid;
                                } else {
                                    title = `${config.group} ${
                                        d.dataset.purpose === 'aggregate'
                                            ? 'Summary'
                                            : 'Distribution'
                                    }`;
                                }

                                return title;
                            });

                        return titles.length <= 4
                            ? `${titles.join(', ')} on ${data[0].label}`
                            : `${titles.slice(0, 3).join(', ')} and [ ${
                                  titles.length - 3
                              } ] more on ${data[0].label}`;
                    }
                }
            },
        },
        displayColors: true, //config.dataType !== 'discrete',
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
