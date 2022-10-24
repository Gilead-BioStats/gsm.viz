import updateConfig from './updateConfig';
import addCustomHoverEvent from '../util/addCanvas/addCustomHoverEvent';
import addCustomClickEvent from '../util/addCanvas/addCustomClickEvent';
import structureData from './structureData';
import triggerTooltip from '../util/triggerTooltip';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _bounds_ - optional auxiliary data plotted as a line representing bounds
 *
 */
export default function updateData(chart, _data_, _config_, _bounds_) {
    chart.data.config = updateConfig(chart, _config_);
    // TODO: figure out why these events have to be redefined on data change
    chart.data.config.hoverEvent = addCustomHoverEvent(
        chart.canvas,
        chart.data.config.hoverCallback
    );
    chart.data.config.clickEvent = addCustomClickEvent(
        chart.canvas,
        chart.data.config.clickCallback
    );
    chart.data.datasets = structureData(_data_, chart.data.config, _bounds_);
    chart.update();

    triggerTooltip(chart);
}
