import configure from './configure';
import structureData from './structureData';
import plugins from './plugins';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Array} _data_ - KRI/QTL results where each array item is an object of key-value pairs
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _parameters_ - KRI/QTL parameters where each array item is an object of key-value pairs
 * @param {Array} _analysis_ - additional statistical output where each array item is an object of key-value pairs
 *
 */
export default function updateData(chart, _data_, _config_, _parameters_ = null, _analysis_ = null) {
    const config = configure(
        _config_,
        _data_,
        _parameters_
    );

    chart.data = {
        ...structureData(
            _data_,
            config,
            _analysis_
        ),
        config,
        _data_
    };

    chart.options.plugins = plugins(config);

    chart.update();
}
