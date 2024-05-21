// Purpose: Add sorting functionality to a table. The rows are sorted in place.
export default function addSorting(headerRow, bodyRows) {
    headerRow.on('click', function(event, column) {
        column.sort(bodyRows, column);
    });
}
