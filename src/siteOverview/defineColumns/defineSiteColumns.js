import sortString from './sortString';
import sortNumber from './sortNumber';

export default function defineSiteColumns(sites) {
    const columns = [
        {
            label: 'Investigator',
            data: sites,
            filterKey: 'siteid',
            valueKey: 'pi_last_name',

            headerTooltip: null,
            sort: sortString,
            tooltip: true,
            type: 'site',
            dataType: 'string',
        },
        {
            label: 'ID',
            data: sites,
            filterKey: 'siteid',
            valueKey: 'siteid',

            headerTooltip: null,
            sort: sortString,
            tooltip: true,
            type: 'site',
            dataType: 'string',
        },
        {
            label: 'Enrolled',
            data: sites,
            filterKey: 'siteid',
            valueKey: 'enrolled_participants',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'site',
            dataType: 'number',
        },
        {
            label: 'Red Flags',
            data: sites,
            filterKey: 'siteid',
            valueKey: 'nRedFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'site',
            dataType: 'number',
        },
        {
            label: 'Amber Flags',
            data: sites,
            filterKey: 'siteid',
            valueKey: 'nAmberFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'site',
            dataType: 'number',
        },
    ];

    return columns;
}
