import sortString from './sortString';
import sortNumber from './sortNumber';
import defineMetricTooltip from './defineMetricTooltip';

export default function defineMetricColumns(metrics, results) {
    const metricColumns = metrics.map((metric) => {
        const column = {
            label: metric.Abbreviation,
            data: results.filter((d) => d.MetricID === metric.MetricID),
            filterKey: 'GroupID',
            valueKey: 'Score',

            headerTooltip: metric.Metric,
            sort: sortNumber,
            tooltip: true,
            defineTooltip: defineMetricTooltip,
            type: 'metric',
            dataType: 'number',

            meta: metric,
        };

        return column;
    });

    return metricColumns;
}
