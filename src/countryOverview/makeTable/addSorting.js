/**
 * Add sorting functionality to a table. The rows are sorted in place.
 *
 * @param {object} headerRow - The header row of the table.
 * @param {object} bodyRows - The rows of the table body.
 *
 * @returns {void}
 */
export default function addSorting(headerRow, body) {
    headerRow.on('click', function(event, column) {
        headerRow.data().forEach((d) => {
            d.activeSort = false;
        });

        // Sort the rows in place.
        column.sort(body.selectAll('tr'), column);
        column.activeSort = true;
    });
}
