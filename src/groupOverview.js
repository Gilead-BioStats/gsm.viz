// check inputs > configure > structure data > make table
import checkInputs from './groupOverview/checkInputs.js';
import configure from './groupOverview/configure.js';

import deriveGroupMetrics from './groupOverview/deriveGroupMetrics';
import defineColumns from './groupOverview/defineColumns';
import structureData from './groupOverview/structureData';
import makeTable from './groupOverview/makeTable';
import updateTable from './groupOverview/updateTable';

/**
 * Generate group overview table.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _groupMetadata_ - optional group metadata
 * @param {Array} _metricMetadata_ - optional metric metadata
 *
 * @returns {Object} HTML table
 */

export default function groupOverview(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _groupMetadata_ = null,
    _metricMetadata_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _groupMetadata_, _metricMetadata_);

    // Merge custom settings with default settings.
    const config = configure(_config_);

    const groupMetadata = deriveGroupMetrics(_groupMetadata_, _results_, config);
    const columns = defineColumns(groupMetadata, _metricMetadata_, _results_);
    const rows = structureData(_results_, columns, groupMetadata, _metricMetadata_);
    const table = makeTable(_element_, rows, columns, config);

    table.updateTable = updateTable.bind({
        _results_,
        _config_,
        _groupMetadata_,
        _metricMetadata_,

        config,
        groupMetadata,
        columns,
        rows,
        table,
    });

    return table;
}
