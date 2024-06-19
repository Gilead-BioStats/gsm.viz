import colorScheme from '../../util/colorScheme.js';

/**
 * Adds traffic light coloring to KRI cells.
 *
 * @param {object} rows - The rows of the table.
 *
 * @returns {void}
 */
export default function addTrafficLighting(rows) {
    const kriCells = rows.selectAll('td.kri');

    kriCells.style('background-color', function (d, i) {
        switch (Math.abs(parseInt(d.flag))) {
            case 0:
                return colorScheme.find((color) => color.flag.includes(0)).color;
            case 1:
                return colorScheme.find((color) => color.flag.includes(1)).color;
            case 2:
                return colorScheme.find((color) => color.flag.includes(2)).color;
            default:
                return '#eee';
        }
    });
};
