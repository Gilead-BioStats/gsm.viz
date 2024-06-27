import checkInput from '../data/checkInput.js';

export default function checkInputs(
    _data_,
    _config_,
    _thresholds_,
    _sites_ = null
) {
    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: 'results',
        module: 'barChart',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'analysisMetadata',
        module: 'barChart',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'thresholds',
        module: 'barChart',
    });

    if (_sites_ !== null) {
        checkInput({
            parameter: '_sites_',
            argument: _sites_,
            schemaName: 'siteMetadata',
            module: 'scatterPlot',
        });
    }
}
