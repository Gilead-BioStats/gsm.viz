/**
 * Purpose: Adds rows to the table header.
 *
 * @param {object} thead - The table header.
 * @param {array} columns - The columns of the table.
 *
 * @returns {object} - The header row of the table.
 */
export default function addHeaderRow(thead, columns) {
    const headerRow = thead
        .append('tr')
        .selectAll('th')
        .data(columns)
        .join('th')
        .classed('tooltip', (d) => d.headerTooltip !== null)
        .text((d) => d.label)
        .attr('title', (d) => d.headerTooltip);

    return headerRow;
}
