/**
 * Add sorting functionality to a table. The rows are sorted in place.
 *
 * @param {object} headerRow - The header row of the table.
 * @param {object} bodyRows - The rows of the table body.
 *
 * @returns {void}
 */
export default function addSorting(headerRow, bodyRows) {
    headerRow.on('click', function(event, column) {
        column.sort(bodyRows, column);
    });
}
