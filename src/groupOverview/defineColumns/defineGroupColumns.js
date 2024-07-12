import sortString from './sortString';
import sortNumber from './sortNumber';
import defineGroupTooltip from './defineGroupTooltip';

export default function defineGroupColumns(groups) {
    const columns = [
        {
            label: 'Group',
            data: groups,
            filterKey: 'GroupID',
            valueKey: 'GroupLabel',

            headerTooltip: null,
            sort: sortString,
            tooltip: true,
            type: 'group',
            dataType: 'string',
        },
        {
            label: 'Enrolled',
            data: groups,
            filterKey: 'GroupID',
            valueKey: 'ParticipantCount',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'group',
            dataType: 'number',
        },
        {
            label: 'Red Flags',
            data: groups,
            filterKey: 'GroupID',
            valueKey: 'nRedFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'group',
            dataType: 'number',
        },
        {
            label: 'Amber Flags',
            data: groups,
            filterKey: 'GroupID',
            valueKey: 'nAmberFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'group',
            dataType: 'number',
        },
    ];

    columns.forEach((column) => {
        column.defineTooltip = defineGroupTooltip;
    });

    return columns;
}
