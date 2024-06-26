import { select } from 'd3';

/**
 * Add row highlighting to table rows.
 *
 * @param {object} rows - The rows of the table body.
 *
 * @returns {void}
 */
export default function addRowHighlighting(rows) {
    rows.on('mouseover', function () {
        select(this).style('background-color', 'lightgray');
    }).on('mouseout', function () {
        select(this).style('background-color', null);
    });
}
