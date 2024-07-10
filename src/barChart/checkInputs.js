import checkInput from '../data/checkInput.js';

export default function checkInputs(
    _results_,
    _config_,
    _thresholds_,
    _groupMetadata_ = null
) {
    checkInput({
        parameter: '_results_',
        argument: _results_,
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

    if (_groupMetadata_ !== null) {
        checkInput({
            parameter: '_groupMetadata_',
            argument: _groupMetadata_,
            schemaName: 'groupMetadata',
            module: 'barChart',
        });
    }
}
