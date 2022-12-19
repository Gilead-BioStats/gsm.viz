import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';
import coalesce from '../util/coalesce';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    defaults.type = 'bar';

    // horizontal
    defaults.x = 'groupid';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';

    // color
    defaults.color = 'flag';
    //defaults.colorScheme = colorScheme;
    defaults.colorLabel = _config_[defaults.color];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {
        console.log(datum);
    };

    // miscellaneous
    //defaults.displayTitle = false;
    defaults.maintainAspectRatio = false;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    config.xLabel = coalesce(_config_.xLabel, config['group']);
    config.yLabel = coalesce(_config_.yLabel, config[config.y]);
    config.chartName = `Bar Chart of ${config.yLabel} by ${config.xLabel}`;

    return config;
}
