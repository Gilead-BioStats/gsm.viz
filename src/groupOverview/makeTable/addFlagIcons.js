import singleArrow from './icons/singleArrow';
import doubleArrow from './icons/doubleArrow';
import checkMark from './icons/checkMark';
import minus from './icons/minus';
import colorScheme from '../../util/colorScheme.js';
import falsy from '../../util/falsy.js';

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
                this.insertAdjacentHTML(
                    'beforeend',
                    checkMark(colorScheme.green.color)
                );
                break;
            case 1:
                this.insertAdjacentHTML(
                    'beforeend',
                    singleArrow(flag, colorScheme.amber.color)
                );
                break;
            case 2:
                this.insertAdjacentHTML(
                    'beforeend',
                    doubleArrow(flag, colorScheme.red.color)
                );
                break;
            default:
                this.insertAdjacentHTML(
                    'beforeend',
                    minus(colorScheme.gray.color)
                );
                break;
        }
    });
}
