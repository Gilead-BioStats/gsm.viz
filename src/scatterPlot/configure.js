import configureAll from '../util/configure.js';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs.js';
import coalesce from '../util/coalesce.js';
import getCallbackWrapper from '../util/addCanvas/getCallbackWrapper.js';

export default function configure(_config_, _data_) {
    const defaults = {};

    // horizontal
    defaults.x = 'Denominator';
    defaults.xType = 'logarithmic';

    // vertical
    defaults.y = 'Numerator';
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
    defaults.displayLegend = true;
    defaults.displayTrendLine = false;
    defaults.maintainAspectRatio = false;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
    });

    // configuration-driven settings
    config.xLabel = coalesce(_config_.xLabel, config[config.x]);
    config.yLabel = coalesce(_config_.yLabel, config[config.y]);
    config.chartName = `Scatter Plot of ${config.yLabel} by ${config.xLabel}`;

    // If callbacks already exist maintain them.
    if (config.hoverCallbackWrapper === undefined)
        config.hoverCallbackWrapper = getCallbackWrapper(config.hoverCallback);
    if (config.clickCallbackWrapper === undefined)
        config.clickCallbackWrapper = getCallbackWrapper(config.clickCallback);

    return config;
}
