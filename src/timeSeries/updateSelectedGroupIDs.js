import configure from './configure.js';
import updateSelectedGroupDatum from '../util/updateSelectedGroupDatum.js';
import structureData from './structureData.js';

/**
 * Update chart configuration and redraw chart.
 *
 * @param {Array} selectedGroupIDs - array of Group IDs to highlight in chart
 *
 */
export default function updateSelectedGroupIDs(selectedGroupIDs) {
    if (!Array.isArray(selectedGroupIDs)) selectedGroupIDs = [selectedGroupIDs];

    this.data.config.selectedGroupIDs = selectedGroupIDs.filter((GroupID) =>
        this.data._results_.map((d) => d.GroupID).includes(GroupID)
    );

    // Update selected group datum.
    this.data.config.selectedGroupDatum = updateSelectedGroupDatum(
        this.data._results_,
        this.data.config.selectedGroupIDs
    );

    // Update data for [ riskSignalSelected ] event.
    this.canvas.riskSignalSelected.data = this.data.config.selectedGroupDatum;

    this.data.datasets = structureData(
        this.data._results_,
        this.data.config,
        this.data._thresholds_,
        null,
        this.data._groupMetadata_
    );

    this.update();
}
