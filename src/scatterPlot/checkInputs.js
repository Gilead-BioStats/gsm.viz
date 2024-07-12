import checkInput from '../data/checkInput.js';

export default function checkInputs(
    _results_,
    _config_,
    _bounds_,
    _groupMetadata_ = null
) {
    checkInput({
        parameter: '_results_',
        argument: _results_,
        schemaName: 'results',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'metricMetadata',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_bounds_',
        argument: _bounds_,
        schemaName: 'resultsPredicted',
        module: 'scatterPlot',
    });

    if (_groupMetadata_ !== null) {
        checkInput({
            parameter: '_groupMetadata_',
            argument: _groupMetadata_,
            schemaName: 'groupMetadata',
            module: 'scatterPlot',
        });
    }
}
