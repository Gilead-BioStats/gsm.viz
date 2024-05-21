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
