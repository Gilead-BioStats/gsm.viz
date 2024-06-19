import sortString from './sortString';
import sortNumber from './sortNumber';

export default function defineCountryColumns(countries) {
    const columns = [
        {
            label: 'Country',
            data: countries,
            filterKey: 'groupid',
            valueKey: 'group_label',

            headerTooltip: null,
            sort: sortString,
            tooltip: true,
            type: 'country',
            dataType: 'string',
        },
        {
            label: 'ID',
            data: countries,
            filterKey: 'groupid',
            valueKey: 'groupid',

            headerTooltip: null,
            sort: sortString,
            tooltip: true,
            type: 'country',
            dataType: 'string',
        },
        {
            label: 'Enrolled',
            data: countries,
            filterKey: 'groupid',
            valueKey: 'enrolled_participants',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'country',
            dataType: 'number',
        },
        {
            label: 'Red Flags',
            data: countries,
            filterKey: 'groupid',
            valueKey: 'nRedFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'country',
            dataType: 'number',
        },
        {
            label: 'Amber Flags',
            data: countries,
            filterKey: 'groupid',
            valueKey: 'nAmberFlags',

            headerTooltip: null,
            sort: sortNumber,
            tooltip: false,
            type: 'country',
            dataType: 'number',
        },
    ];

    return columns;
}
