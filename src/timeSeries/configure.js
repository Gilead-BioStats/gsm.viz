import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import coalesce from '../util/coalesce';
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
        defaults.dataType === 'discrete'
            ? 'aggregate'
            : /^qtl/.test(_config_?.workflowid)
            ? 'identity'
            : 'boxplot';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';

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

    config.xLabel = coalesce(_config_.xLabel, 'Snapshot Date');
    config.yLabel = coalesce(
        _config_.yLabel,
        config.dataType === 'continuous'
            ? config[config.y]
            : /flag/.test(config.y) && /risk/.test(config.y)
            ? `At Risk or Flagged ${config.discreteUnit}s`
            : /flag/.test(config.y)
            ? `Flagged ${config.discreteUnit}s`
            : /risk/.test(config.y)
            ? `At Risk ${config.discreteUnit}s`
            : ''
    );

    return config;
}
