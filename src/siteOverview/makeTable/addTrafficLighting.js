import colorScheme from '../../util/colorScheme.js';

/**
 * Adds traffic light coloring to Metric cells.
 *
 * @param {object} rows - The rows of the table.
 *
 * @returns {void}
 */
export default function addTrafficLighting(rows) {
    const metricCells = rows.selectAll('td.metric');

    metricCells.style('background-color', function (d, i) {
        switch (Math.abs(parseInt(d.Flag))) {
            case 0:
                return colorScheme.find((color) =>
                    color.Flag.includes(0)
                ).color;
            case 1:
                return colorScheme.find((color) =>
                    color.Flag.includes(1)
                ).color;
            case 2:
                return colorScheme.find((color) =>
                    color.Flag.includes(2)
                ).color;
            default:
                return '#eee';
        }
    });
}
