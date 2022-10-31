import updateConfig from './updateConfig';
import structureData from './structureData';
import addCustomHoverEvent from '../util/addCanvas/addCustomHoverEvent';
import addCustomClickEvent from '../util/addCanvas/addCustomClickEvent';
import plugins from './plugins';
import getScales from './getScales';
import { min, max } from 'd3';

/**
 * Update chart data and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 *
 */
export default function updateData(chart, _data_, _config_) {
    chart.data.config = updateConfig(chart, _config_);
    chart.data.datasets = structureData(_data_, chart.data.config);

    // TODO: figure out why these events have to be redefined on data change
    chart.data.config.hoverEvent = addCustomHoverEvent(
        chart.canvas,
        chart.data.config.hoverCallback
    );
    chart.data.config.clickEvent = addCustomClickEvent(
        chart.canvas,
        chart.data.config.clickCallback
    );

    chart.options.plugins = plugins(
        chart.data.config,
        chart.data.datasets[0].data
    );
    chart.options.scales = getScales(
        chart.data.config,
        chart.data.datasets[0].data
    );

    chart.update();
}
