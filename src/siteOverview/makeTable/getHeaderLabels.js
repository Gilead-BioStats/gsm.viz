export default function getHeaderLabels(columns, workflows) {
    return [
        {
            key: 'groupid',
            text: 'Site ID',
        },
        {
            key: 'invname',
            text: 'Investigator',
        },
        {
            key: 'enrolled_participants',
            text: 'Enrolled',
        },
        {
            key: 'nRedFlags',
            text: 'Red Flags',
        },
        {
            key: 'nAmberFlags',
            text: 'Amber Flags',
        },
        ...workflows.map((workflow) => ({
            key: workflow.workflowid,
            text: workflow.abbreviation,
        })),
    ];
}
