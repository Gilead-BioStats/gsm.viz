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
                    // distribution (boxplot, violin plot)
                    if (data[0].dataset.type.purpose === 'distribution') {
                        return `${config.group} Distribution on ${data[0].label}`;
                    }
                    // aggregate (discrete KRI distribution, QTL)
                    else if (data[0].dataset.purpose === 'aggregate') {
                        console.log(data[0].dataset.purpose, data[0].dataset.type);
                        return `${config.group} Summary on ${data[0].label}`;
                    }
                    // data point
                    else {
                        console.log(data[0].dataset.purpose, data[0].dataset.type);
                        const dataSorted = sortByGroupID(data);
                        console.log(dataSorted);

                        const titles = dataSorted
                            .map(function (d, i) {
                                let title;

                                if (data.length === 1) {
                                    title = `${config.group} ${d.dataset.data[d.dataIndex].groupid}`;

                                    if (d.raw.site !== undefined) {
                                        title = `${title} (${
                                            d.raw.site.pi_last_name
                                        } / ${
                                            d.raw.site.enrolled_participants
                                        } enrolled)`;
                                    }
                                } else {
                                    title = i === 0
                                        ? `${config.group}s ${d.dataset.data[d.dataIndex].groupid}`
                                        : d.dataset.data[d.dataIndex].groupid;
                                }

                                return title;
                            });

                        const title = titles.length <= 4
                            ? `${titles.join(', ')} on ${data[0].label}`
                            : `${titles.slice(0, 3).join(', ')} and [ ${
                                  titles.length - 3
                              } ] more on ${data[0].label}`;
                        console.log(title);

                        return title;
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
