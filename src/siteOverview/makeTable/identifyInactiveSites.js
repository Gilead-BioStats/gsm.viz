/**
 * Identifies inactive sites by applying a line-through style to the site ID.
 *
 * @param {object} rows - The rows of the table body.
 *
 * @returns {void}
 */
export default function identifyInactiveSites(rows) {
    rows.selectAll('td.siteid').style('text-decoration', (d) =>
        d.status === 'Active' ? null : 'line-through'
    );
}
