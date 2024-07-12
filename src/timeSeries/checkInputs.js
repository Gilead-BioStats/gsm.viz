import checkInput from '../data/checkInput.js';

export default function checkInputs(
    _results_,
    _config_,
    _thresholds_,
    _intervals_,
    _groupMetadata_ = null
) {
    const discrete = /^n_((at_risk)?(_or_)?(flagged)?)$/i.test(_config_?.y);

    checkInput({
        parameter: '_results_',
        argument: _results_,
        schemaName: discrete ? 'flagCounts' : 'results',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_config_',
        argument: discrete ? null : _config_,
        schemaName: 'analysisMetadata',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'thresholds',
        module: 'timeSeries',
    });

    checkInput({
        parameter: '_intervals_',
        argument: _intervals_,
        schemaName: 'resultsVertical',
        module: 'timeSeries',
    });

    if (_groupMetadata_ !== null) {
        checkInput({
            parameter: '_groupMetadata_',
            argument: _groupMetadata_,
            schemaName: 'groupMetadata',
            module: 'timeSeries',
        });
    }
}
