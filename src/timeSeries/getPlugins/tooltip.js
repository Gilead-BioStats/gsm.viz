import getTooltipAesthetics from '../../util/getTooltipAesthetics.js';
import formatResultTooltipContent from '../../util/formatResultTooltipContent.js';
import sortByGroupID from '../../util/sortByGroupID.js';

// TODO: figure out better approach to coincidental highlight and group aggregate distribution
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
                        return `${config.GroupLevel} Distribution on ${data[0].label}`;
                    }
                    // aggregate (discrete Metric distribution, QTL)
                    else if (data[0].dataset.purpose === 'aggregate') {
                        return `${config.GroupLevel} Summary on ${data[0].label}`;
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
                                title = `${config.GroupLevel} ${
                                    d.dataset.data[d.dataIndex].GroupID
                                }`;

                                if (d.raw.group !== undefined) {
                                    title = `${title} (${d.raw.group.GroupLabel} / ${d.raw.group.ParticipantCount} enrolled)`;
                                }
                            } else {
                                title =
                                    i === 0
                                        ? `${config.GroupLevel}s ${
                                              d.dataset.data[d.dataIndex]
                                                  .GroupID
                                          }`
                                        : d.dataset.data[d.dataIndex].GroupID;
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
            const isSelected = config.selectedGroupIDs.includes(datum.GroupID);
            const isScatter = data.dataset.type === 'scatter';

            // Avoid duplicate display of tooltip.
            return !isAnnotation && isObject && !(isSelected && isScatter);
        },
        ...tooltipAesthetics,
    };
}
