import checkInput from '../data/checkInput.js';

/**
 * Check input data against data schema.
 *
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _groupMetadata_ - optional country metadata
 * @param {Array} _metricMetadata_ - optional metric metadata
 *
 * @returns {void}
 */
export default function checkInputs(
    _results_,
    _config_,
    _groupMetadata_,
    _metricMetadata_
) {
    checkInput({
        parameter: '_results_',
        argument: _results_,
        schemaName: 'results',
        module: 'groupOverview',
    });

    //checkInput({
    //    parameter: '_config_',
    //    argument: _config_,
    //    schemaName: 'analysisMetadata',
    //    module: 'groupOverview',
    //});

    checkInput({
        parameter: '_groupMetadata_',
        argument: _groupMetadata_,
        schemaName: 'groupMetadata',
        module: 'groupOverview',
    });

    //checkInput({
    //    parameter: '_metricMetadata_',
    //    argument: _metricMetadata_,
    //    schemaName: 'metrics',
    //    module: 'groupOverview',
    //});
}
