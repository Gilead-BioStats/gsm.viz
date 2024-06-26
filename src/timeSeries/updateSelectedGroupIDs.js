import configure from './configure.js';
import structureData from './structureData.js';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Array} selectedGroupIDs - array of Group IDs to highlight in chart
 *
 */
export default function updateSelectedGroupIDs(selectedGroupIDs) {
    this.data.config.selectedGroupIDs = [selectedGroupIDs];
    this.data.datasets = structureData(
        this.data._data_,
        this.data.config,
        this.data._thresholds_,
        null,
        this.data._sites_
    );
    this.update();
}
