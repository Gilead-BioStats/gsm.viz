import sortString from './sortString';
import sortNumber from './sortNumber';

export default function defineWorkflowColumns(workflows, results) {
    const workflowColumns = workflows.map((workflow) => {
        const column = {
            label: workflow.abbreviation,
            data: results
                .filter(d => d.workflowid === workflow.workflowid),
            filterKey: 'groupid',
            valueKey: 'score',

            headerTooltip: workflow.metric,
            sort: sortNumber,
            tooltip: true,
            type: 'kri',
        };

        return column;
    });

    return workflowColumns;
}

