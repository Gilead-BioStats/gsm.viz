import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import addCanvas from './util/addCanvas';
import configure from './scatterPlot/configure';
import structureData from './scatterPlot/structureData';
import definePlugins from './scatterPlot/definePlugins';
import getScales from './scatterPlot/getScales';
import updateData from './scatterPlot/updateData';
import updateConfig from './scatterPlot/updateConfig';
import updateOption from './scatterPlot/updateOption';

export default function scatterPlot(
    _element_,
    _data_,
    _config_ = {},
    bounds = null
) {
    const canvas = addCanvas(_element_);

    // Update config.
    const config = configure(_config_);

    // Define array of input datasets to chart.
    const datasets = structureData(_data_, config, bounds);

    // Define plugins (title, tooltip) and scales (x, y).
    const options = {
        plugins: definePlugins(config),
        scales: getScales(config),
    };

    const chart = new Chart(canvas, {
        data: {
            datasets,
            config
        },
        options
    });

    chart.helpers = {
        updateData: updateData,
        updateConfig: updateConfig,
        updateOption: updateOption
    };

    return chart;
}
