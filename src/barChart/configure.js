import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';
import coalesce from '../util/coalesce';
import getCallbackWrapper from '../util/addCanvas/getCallbackWrapper';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    // horizontal
    defaults.x = 'groupid';
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
    defaults.displayTitle = false;
    defaults.maintainAspectRatio = false;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    // configuration-driven settings
    config.xLabel = coalesce(_config_.xLabel, config['group']);
    config.yLabel = coalesce(_config_.yLabel, config[config.y]);
    config.chartName = `Bar Chart of ${config.yLabel} by ${config.xLabel}`;
    if (config.y === 'metric') delete config.thresholds;

    // If callbacks already exist maintain them.
    if (config.hoverCallbackWrapper === undefined)
        config.hoverCallbackWrapper = getCallbackWrapper(config.hoverCallback);
    if (config.clickCallbackWrapper === undefined)
        config.clickCallbackWrapper = getCallbackWrapper(config.clickCallback);

    return config;
}
