/**
 * Add cells to table.
 *
 * @param {object} bodyRows - The rows of the table body.
 *
 * @returns {object} - The cells of the table.
 */
export default function addCells(bodyRows) {
    const cells = bodyRows
        .selectAll('td')
        .data(
            (d) => d,
            // Define a unique key for each cell.
            (d) => {
                const id =
                    d.column.type === 'kri'
                        ? `${d.SiteID}-${d.column.meta.MetricID}`
                        : `${d.SiteID}-${d.column.valueKey}`;

                return id;
            }
        )
        .join('td')
        .text((d) => (d.text === 'NA' ? '-' : d.text))
        .attr('class', (d) => d.class)
        .classed('tooltip', (d) => d.tooltip)
        .attr('title', (d) => (d.tooltip ? d.tooltipContent : null));

    return cells;
}
