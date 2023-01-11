import configureAll from '../util/configure';
import coalesce from '../util/coalesce';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';
import getCallbackWrapper from '../util/addCanvas/getCallbackWrapper';

export default function configure(_config_, _data_, _thresholds_, _intervals_) {
    const defaults = {};

    defaults.dataType = /flag|risk/.test(_config_.y)
        ? 'discrete'
        : 'continuous';

    if (defaults.dataType === 'discrete')
        defaults.discreteUnit = Object.keys(_data_[0]).includes('groupid')
            ? 'KRI'
            : 'Site';
    else defaults.discreteUnit = null;

    defaults.distributionDisplay = 'boxplot';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';

    // color
    defaults.color = 'flag';

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {
        console.log(datum);
    };

    // miscellaneous
    defaults.group = 'Site';
    defaults.aggregateLabel = 'Study';
    defaults.annotateThreshold = _thresholds_ !== null;
    //defaults.displayTitle = false;
    defaults.maintainAspectRatio = false;
    //defaults.displayBoxplots = true;
    //defaults.displayViolins = false;
    //defaults.displayAmberFlags = true;
    //defaults.displayRedFlags = true;
    //defaults.displayThresholds = true;
    //defaults.displayTrendLine = true;

    _config_.variableThresholds = Array.isArray(_thresholds_)
        ? _thresholds_.some(
              (threshold) =>
                  threshold.snapshot_date !== _thresholds_[0].snapshot_date
          )
        : false;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    config.xLabel = coalesce(_config_.xLabel, 'Snapshot Date');
    const discreteUnits =
        config.dataType === 'discrete'
            ? `${config.discreteUnit.replace(/y$/, 'ie')}s`
            : '';
    config.yLabel = coalesce(
        _config_.yLabel,
        config.dataType === 'continuous'
            ? config[config.y]
            : /flag/.test(config.y) && /risk/.test(config.y)
            ? `Red or Amber ${discreteUnits}`
            : /flag/.test(config.y)
            ? `Red ${discreteUnits}`
            : /risk/.test(config.y)
            ? `Amber ${discreteUnits}`
            : ''
    );
    config.chartName = `Time Series of ${config.yLabel} by ${config.xLabel}`;

    // If callbacks already exist maintain them.
    if (config.hoverCallbackWrapper === undefined)
        config.hoverCallbackWrapper = getCallbackWrapper(config.hoverCallback);
    if (config.clickCallbackWrapper === undefined)
        config.clickCallbackWrapper = getCallbackWrapper(config.clickCallback);

    return config;
}
