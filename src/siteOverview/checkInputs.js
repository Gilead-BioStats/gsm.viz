import checkInput from '../data/checkInput.js';

/**
 * Check input data against data schema.
 *
 * @param {Array} _results_ - input data where each array item is an object of key-value pairs
 * @param {Object} _config_ - table configuration and metadata
 * @param {Array} _sites_ - optional site metadata
 * @param {Array} _metrics_ - optional metric metadata
 *
 * @returns {void}
 */
export default function checkInputs(_results_, _config_, _sites_, _metrics_) {
    checkInput({
        parameter: '_results_',
        argument: _results_,
        schemaName: 'results',
        module: 'siteOverview',
    });

    //checkInput({
    //    parameter: '_config_',
    //    argument: _config_,
    //    schemaName: 'analysisMetadata',
    //    module: 'siteOverview',
    //});

    checkInput({
        parameter: '_sites_',
        argument: _sites_,
        schemaName: 'siteMetadata',
        module: 'siteOverview',
    });

    //checkInput({
    //    parameter: '_metrics_',
    //    argument: _metrics_,
    //    schemaName: 'metrics',
    //    module: 'siteOverview',
    //});
}
