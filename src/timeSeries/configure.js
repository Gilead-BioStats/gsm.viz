import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';

export default function configure(_config_, _data_, _parameters_) {
    const defaults = {};

    defaults.type = 'boxplot';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';
    defaults.xLabel = 'Snapshot Date';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';
    defaults.yLabel = /flag|at.risk/.test(_config_.y)
        ? '# At Risk or Flagged'
        : _config_[defaults.y];

    // color
    //defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[defaults.color];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => { console.log(datum); };

    // miscellaneous
    //defaults.displayTitle = false;
    defaults.maintainAspectRatio = false;
    defaults.displayBoxplots = true;
    defaults.displayViolins = false;
    defaults.displayAtRisk = true;
    defaults.displayFlagged = true;
    defaults.displayThresholds = true;
    defaults.displayTrendLine = true;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
        thresholds: checkThresholds.bind(null, _config_, _parameters_),
    });

    return config;
}
