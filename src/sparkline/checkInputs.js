import checkInput from '../data/checkInput.js';

export default function checkInputs(_data_, _config_, _thresholds_) {
    const discrete = /^n_((at_risk)?(_or_)?(flagged)?)$/i.test(_config_.y);

    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: discrete ? 'flagCounts' : 'results',
        module: 'sparkline',
    });

    checkInput({
        parameter: '_config_',
        argument: discrete ? null : _config_,
        schemaName: 'analysisMetadata',
        module: 'sparkline',
    });

    checkInput({
        parameter: '_thresholds_',
        argument: _thresholds_,
        schemaName: 'thresholds',
        module: 'sparkline',
    });
}
