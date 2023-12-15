import triggerTooltip from '../util/triggerTooltip.js.js';

/**
 * Update a single chart option and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {string} option - dot-delimited object path of option
 * @param {(string|number)} value - option value
 *
 */
export default function updateOption(chart, option, value) {
    const objPath = option.split('.');
    let obj = chart.options;
    for (let i = 0; i < objPath.length; i++) {
        if (i < objPath.length - 1) obj = obj[objPath[i]];
        else obj[objPath[i]] = value;
    }
    chart.update();

    triggerTooltip(chart);
}
