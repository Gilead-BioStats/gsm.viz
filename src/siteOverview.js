// check inputs > configure > structure data > make table
import checkInputs from './siteOverview/checkInputs.js';
import configure from './siteOverview/configure.js';

import deriveSiteMetrics from './siteOverview/deriveSiteMetrics';
import defineColumns from './siteOverview/defineColumns';
import structureData from './siteOverview/structureData';
import makeTable from './siteOverview/makeTable';

/**
 * Generate site overview table.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _sites_ - optional site metadata
 * @param {Array} _workflows_ - optional workflow metadata
 *
 * @returns {Object} HTML table
 */

export default function siteOverview(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _sites_ = null,
    _workflows_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _sites_, _workflows_);

    // Merge custom settings with default settings.
    const config = configure(_config_);

    const sites = deriveSiteMetrics(_sites_, _results_);
    const columns = defineColumns(sites, _workflows_, _results_);
    const rows = structureData(_results_, columns, sites, _workflows_);
    const table = makeTable(_element_, rows, columns, config);

    return table;
}
