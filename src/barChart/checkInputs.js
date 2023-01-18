import checkInput from '../data/checkInput';

export default function checkInputs(_data_, _config_, _thresholds_) {
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
        schemaName: 'analysisParameters',
        module: 'barChart',
    });
}
