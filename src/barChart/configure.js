import configureAll from '../util/configure.js';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs.js';
import checkThresholds from '../util/checkThresholds.js';
import coalesce from '../util/coalesce.js';
import getCallbackWrapper from '../util/addCanvas/getCallbackWrapper.js';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    // horizontal
    defaults.x = 'GroupID';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'Score';
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
    if (config.y === 'Metric') delete config.thresholds;

    // If callbacks already exist maintain them.
    if (config.hoverCallbackWrapper === undefined)
        config.hoverCallbackWrapper = getCallbackWrapper(config.hoverCallback);
    if (config.clickCallbackWrapper === undefined)
        config.clickCallbackWrapper = getCallbackWrapper(config.clickCallback);

    return config;
}
