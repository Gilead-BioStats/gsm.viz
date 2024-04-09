import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';
import formatResultTooltipContent from '../../util/formatResultTooltipContent.js';
import sortByGroupID from '../../util/sortByGroupID.js';

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
                    if (data[0].dataset.purpose === 'distribution') {
                        return `${config.group} Distribution on ${data[0].label}`;
                    }
                    // aggregate (discrete KRI distribution, QTL)
                    else if (data[0].dataset.purpose === 'aggregate') {
                        return `${config.group} Summary on ${data[0].label}`;
                    }
                    // data point
                    else {
                        let dataSorted = data;
                        try {
                            dataSorted = sortByGroupID(data, config);
                        } catch (err) {
                            console.log(err);
                            console.log(data);
                        }

                        const titles = dataSorted.map(function (d, i) {
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
                                              d.dataset.data[d.dataIndex]
                                                  .groupid
                                          }`
                                        : d.dataset.data[d.dataIndex].groupid;
                            }

                            return title;
                        });

                        const title =
                            titles.length <= 4
                                ? `${titles.join(', ')} on ${data[0].label}`
                                : `${titles.slice(0, 3).join(', ')} and [ ${
                                      titles.length - 3
                                  } ] more on ${data[0].label}`;

                        return title;
                    }
                }
            },
        },
        displayColors: true, //config.dataType !== 'discrete',
        filter: (data) => {
            const datum = data.dataset.data[data.dataIndex];
            const isAnnotation = data.dataset.purpose === 'annotation';
            const isObject = typeof datum === 'object';
            const isSelected = config.selectedGroupIDs.includes(datum.groupid);
            const isScatter = data.dataset.type === 'scatter';

            // Avoid duplicate display of tooltip.
            return !isAnnotation && isObject && !(isSelected && isScatter);
        },
        ...tooltipAesthetics,
    };
}
