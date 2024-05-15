import singleArrow from './icons/singleArrow';
import doubleArrow from './icons/doubleArrow';

export default function addFlagIcons(rows) {
    const kriCells = rows.selectAll('td.kri');

    kriCells
        .each(function (d) {
            const flag = parseInt(d.flag);
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
};
