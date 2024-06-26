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
 * @param {Array} _groups_ - optional group metadata
 * @param {Array} _workflows_ - optional workflow metadata
 *
 * @returns {Object} HTML table
 */

export default function groupOverview(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _groups_ = null,
    _workflows_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _groups_, _workflows_);

    // Merge custom settings with default settings.
    const config = configure(_config_);

    const groups = deriveGroupMetrics(_groups_, _results_);
    const columns = defineColumns(groups, _workflows_, _results_);
    const rows = structureData(_results_, columns, groups, _workflows_);
    const table = makeTable(_element_, rows, columns, config);

    table.updateTable = updateTable.bind({
        _results_,
        _config_,
        _groups_,
        _workflows_,

        config,
        groups,
        columns,
        rows,
        table,
    });

    return table;
}
