import checkInput from '../data/checkInput.js';

/**
 * Check input data against data schema.
 *
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _countries_ - optional country metadata
 * @param {Array} _workflows_ - optional workflow metadata
 *
 * @returns {void}
 */
export default function checkInputs(
    _results_,
    _config_,
    _countries_,
    _workflows_
) {
    checkInput({
        parameter: '_results_',
        argument: _results_,
        schemaName: 'results',
        module: 'countryOverview',
    });

    //checkInput({
    //    parameter: '_config_',
    //    argument: _config_,
    //    schemaName: 'analysisMetadata',
    //    module: 'countryOverview',
    //});

    checkInput({
        parameter: '_countries_',
        argument: _countries_,
        schemaName: 'groupMetadata',
        module: 'countryOverview',
    });

    //checkInput({
    //    parameter: '_workflows_',
    //    argument: _workflows_,
    //    schemaName: 'workflows',
    //    module: 'countryOverview',
    //});
}
