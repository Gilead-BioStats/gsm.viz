import singleArrow from './icons/singleArrow';
import doubleArrow from './icons/doubleArrow';

/**
 * Adds flag icons to the Metric cells.
 *
 * @param {object} rows - The rows of the table.
 *
 * @returns {void}
 */
export default function addFlagIcons(rows) {
    const metricCells = rows.selectAll('td.group-overview--metric').text('');

    metricCells.each(function (d) {
        const flag = parseInt(d.Flag);
        const absFlag = Math.abs(flag);

        switch (absFlag) {
            case 0:
                break;
            case 1:
                this.insertAdjacentHTML('beforeend', singleArrow(flag));
                break;
            case 2:
                this.insertAdjacentHTML('beforeend', doubleArrow(flag));
                break;
            default:
                this.textContent = '-';
                break;
        }
    });
}
