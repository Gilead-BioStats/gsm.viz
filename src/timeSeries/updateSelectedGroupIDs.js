import configure from './configure';
import structureData from './structureData';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Object} chart - Chart.js chart object
 * @param {Object} _config_ - chart configuration and metadata
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 *
 */
export default function updateSelectedGroupIDs(selectedGroupIDs) {
    this.data.config.selectedGroupIDs = selectedGroupIDs;
    this.data.config = configure(this.data.config, this.data._data_);
    this.data.datasets = structureData(
        this.data._data_,
        this.data.config
    ).datasets;
    this.update();
}
