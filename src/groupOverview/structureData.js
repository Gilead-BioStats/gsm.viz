import { group } from 'd3';

import sortByFlags from './structureData/sortByFlags';

export default function structureData(results, columns, groups) {
    const lookup = group(
        results,
        (d) => d.GroupID,
        (d) => d.MetricID
    );

    const rowData = Array.from(lookup, ([key, value]) => {
        const group = groups.find((group) => group.GroupID === key);

        const rowDatum = columns.map((column) => {
            const datum = {
                ...(column.getDatum(key) || {}),
                column: column,
                group: group,
                GroupID: key,
            };

            // TODO: get rid of value or text
            datum.value = datum[column.valueKey];
            datum.text = datum.value;
            // TODO: This is a hack to get the correct sort value for KRI columns.
            datum.sortValue =
                column.type === 'kri'
                    ? Math.abs(parseFloat(datum.value))
                    : datum.value;
            datum.class = [column.type, column.valueKey].join(' ');
            datum.tooltip = column.tooltip;
            datum.tooltipContent = column.defineTooltip(column, datum);

            return datum;
        });

        rowDatum.key = key;

        return rowDatum;
    });

    // Sort by # Red Flags, then # Amber Flags, #Green Flags, then Investigator ID;
    // this is the default sort order for the table.
    const sortedData = sortByFlags(rowData);

    return sortedData;
}
