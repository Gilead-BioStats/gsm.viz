import updateConfig from './updateConfig';
import structureData from './structureData';
import addCustomEvent from '../util/addCanvas/addCustomEvent';
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
    // Maintain preexisting event listener callbacks to avoid attaching duplicate event listeners.
    const hoverCallbackWrapper = chart.data.config.hoverCallbackWrapper;
    _config_.hoverCallbackWrapper = hoverCallbackWrapper;

    const clickCallbackWrapper = chart.data.config.clickCallbackWrapper;
    _config_.clickCallbackWrapper = clickCallbackWrapper;

    // Update chart configuration and datasets.
    chart.data.config = updateConfig(chart, _config_);
    chart.data.datasets = structureData(_data_, chart.data.config);

    // TODO: figure out why these events have to be redefined on data change
    chart.data.config.hoverEvent = addCustomEvent(
        chart.canvas,
        hoverCallbackWrapper,
        'hover'
    );
    chart.data.config.clickEvent = addCustomEvent(
        chart.canvas,
        clickCallbackWrapper,
        'click'
    );

    // Update chart plugins and scales.
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
