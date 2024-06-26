/**
 * Adds rows to the table body.
 *
 * @param {object} tbody - The table body.
 * @param {array} rows - The rows of the table.
 *
 * @returns {object} - The rows of the table body.
 */
export default function addBodyRows(tbody, rows) {
    const bodyRows = tbody
        .selectAll('tr')
        .data(
            rows,
            // Define a unique key for each row.
            (d) => d.key
        )
        .join('tr');

    return bodyRows;
}
