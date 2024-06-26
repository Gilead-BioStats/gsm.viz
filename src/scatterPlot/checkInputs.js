import checkInput from '../data/checkInput.js';

export default function checkInputs(
    _data_,
    _config_,
    _bounds_,
    _sites_ = null
) {
    checkInput({
        parameter: '_data_',
        argument: _data_,
        schemaName: 'results',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_config_',
        argument: _config_,
        schemaName: 'analysisMetadata',
        module: 'scatterPlot',
    });

    checkInput({
        parameter: '_bounds_',
        argument: _bounds_,
        schemaName: 'resultsPredicted',
        module: 'scatterPlot',
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
