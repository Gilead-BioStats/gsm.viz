import makeRowData from './siteOverview/makeRowData';
import makeTable from './siteOverview/makeTable';

/**
 * Generate site overview table.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _data_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _sites_ - optional site metadata
 * @param {Array} _workflows_ - optional workflow metadata
 *
 * @returns {Object} HTML table
 */

export default function siteOverview(
    _element_ = 'body',
    _data_ = [],
    _config_ = {},
    _sites_ = null,
    _workflows_ = null
) {
    // Check input data against data schema.
    //checkInputs(_data_, _config_, _bounds_, _sites_);

    // Merge custom settings with default settings.
    //const config = configure(_config_, _data_);

    const rowData = makeRowData(_data_, _sites_, _workflows_);
    const table = makeTable(_element_, rowData, _workflows_);

    return table;
}
