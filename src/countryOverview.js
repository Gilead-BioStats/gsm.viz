// check inputs > configure > structure data > make table
import checkInputs from './countryOverview/checkInputs.js';
import configure from './countryOverview/configure.js';

import deriveCountryMetrics from './countryOverview/deriveCountryMetrics';
import defineColumns from './countryOverview/defineColumns';
import structureData from './countryOverview/structureData';
import makeTable from './countryOverview/makeTable';
import updateTable from './countryOverview/updateTable';

/**
 * Generate country overview table.
 *
 * @param {(Node|string)} _element_ - DOM element or ID in which to render chart
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _countries_ - optional country metadata
 * @param {Array} _workflows_ - optional workflow metadata
 *
 * @returns {Object} HTML table
 */

export default function countryOverview(
    _element_ = 'body',
    _results_ = [],
    _config_ = {},
    _countries_ = null,
    _workflows_ = null
) {
    // Check input data against data schema.
    checkInputs(_results_, _config_, _countries_, _workflows_);

    // Merge custom settings with default settings.
    const config = configure(_config_);

    const countries = deriveCountryMetrics(_countries_, _results_);
    const columns = defineColumns(countries, _workflows_, _results_);
    const rows = structureData(_results_, columns, countries, _workflows_);
    const table = makeTable(_element_, rows, columns, config);

    table.updateTable = updateTable.bind({
        config,
        countries,
        _workflows_,
        columns,
        rows,
        table,
    });

    return table;
}
