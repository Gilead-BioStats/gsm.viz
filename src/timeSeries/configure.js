import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    defaults.dataType = /flag|risk/.test(_config_.y)
        ? 'discrete'
        : 'continuous';
    if (defaults.dataType === 'discrete')
        defaults.discreteUnit = Object.keys(_data_[0]).includes('groupid')
            ? 'KRI'
            : 'Site';

    defaults.type =
        defaults.dataType === 'continuous' ? 'boxplot' : 'aggregate';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';
    defaults.xLabel = 'Snapshot Date';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';
    defaults.yLabel =
        defaults.dataType === 'continuous'
            ? _config_[defaults.y]
            : /flag/.test(_config_.y) && /risk/.test(_config_.y)
            ? `At Risk or Flagged ${defaults.discreteUnit}s`
            : /flag/.test(_config_.y)
            ? `Flagged ${defaults.discreteUnit}s`
            : /risk/.test(_config_.y)
            ? `At Risk ${defaults.discreteUnit}s`
            : '';

    // color
    //defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[defaults.color];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {
        console.log(datum);
    };

    // miscellaneous
    defaults.group = 'Site';
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
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    return config;
}
