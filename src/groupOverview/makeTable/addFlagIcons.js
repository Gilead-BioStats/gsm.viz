import singleArrow from './icons/singleArrow';
import doubleArrow from './icons/doubleArrow';
import checkMark from './icons/checkMark';
import minus from './icons/minus';
import colorScheme from '../../util/colorScheme.js';


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
        let color;

        switch (absFlag) {
            case 0:
                color = colorScheme.find(c => c.Flag.includes(0)).color;
                this.insertAdjacentHTML('beforeend', checkMark(color));
                break;
            case 1:
                color = colorScheme.find(c => c.Flag.includes(1)).color;
                this.insertAdjacentHTML('beforeend', singleArrow(flag, color));
                break;
            case 2:
                color = colorScheme.find(c => c.Flag.includes(2)).color;
                this.insertAdjacentHTML('beforeend', doubleArrow(flag, color));
                break;
            default:
                color = colorScheme.find(c => !c.Flag).color;
                this.insertAdjacentHTML('beforeend', minus(color));
                break;
        }
    });
}
