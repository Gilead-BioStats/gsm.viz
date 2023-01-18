import configure from './configure';
import structureData from './structureData';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Array} selectedGroupIDs - array of group IDs to highlight in chart
 *
 */
export default function updateSelectedGroupIDs(selectedGroupIDs) {
    this.data.config.selectedGroupIDs = selectedGroupIDs;
    this.data.config = configure(
        this.data.config,
        this.data._data_,
        this.data._thresholds_,
        this.data._intervals_
    );
    this.data.datasets = structureData(
        this.data._data_,
        this.data.config,
        this.data._thresholds_
    );
    this.update();
}
