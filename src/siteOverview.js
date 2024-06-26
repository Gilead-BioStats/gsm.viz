// check inputs > configure > structure data > make table
import checkInputs from './siteOverview/checkInputs.js';
import configure from './siteOverview/configure.js';

import deriveSiteMetrics from './siteOverview/deriveSiteMetrics';
import defineColumns from './siteOverview/defineColumns';
import structureData from './siteOverview/structureData';
import makeTable from './siteOverview/makeTable';
import updateTable from './siteOverview/updateTable';

/**
 * Generate site overview table.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _sites_ - optional site metadata
 * @param {Array} _metrics_ - optional metric metadata
 *
 * @returns {Object} HTML table
 */

export default function siteOverview(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _sites_ = null,
    _metrics_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _sites_, _metrics_);

    // Merge custom settings with default settings.
    const config = configure(_config_);

    const sites = deriveSiteMetrics(_sites_, _results_);
    const columns = defineColumns(sites, _metrics_, _results_);
    const rows = structureData(_results_, columns, sites);
    const table = makeTable(_element_, rows, columns, config);

    table.updateTable = updateTable.bind({
        _results_,
        _config_,
        _sites_,
        _metrics_,

        config,
        sites,
        columns,
        rows,
        table,
    });

    return table;
}
