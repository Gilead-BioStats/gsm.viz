import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from './configure/checkThresholds';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    defaults.type = 'bar';

    // horizontal
    defaults.x = 'groupid';
    //defaults.xType = 'logarithmic';
    defaults.xLabel = _config_['group'];

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';
    defaults.yLabel = _config_[defaults.y];

    // color
    defaults.color = 'flag';
    //defaults.colorScheme = colorScheme;
    defaults.colorLabel = _config_[defaults.color];

    // numerator
    defaults.num = 'numerator';
    defaults.numeratorLabel = _config_[defaults.num];

    // denominator
    defaults.denom = 'denominator';
    defaults.denominatorLabel = _config_[defaults.denom];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {};

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

    return config;
}
