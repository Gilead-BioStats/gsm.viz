import sortString from './sortString';
import sortNumber from './sortNumber';

export default function defineWorkflowColumns(workflows, results) {
    const workflowColumns = workflows.map((workflow) => {
        const column = {
            label: workflow.Abbreviation,
            data: results.filter((d) => d.MetricID === workflow.MetricID),
            filterKey: 'GroupID',
            valueKey: 'score',

            headerTooltip: workflow.Metric,
            sort: sortNumber,
            tooltip: true,
            type: 'kri',
            dataType: 'number',

            meta: workflow,
        };

        return column;
    });

    return workflowColumns;
}
