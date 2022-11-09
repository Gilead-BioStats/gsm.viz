import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';

export default function configure(_config_, _data_, _parameters_) {
    const defaults = {};

    defaults.type = 'line';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';
    defaults.xLabel = _config_[defaults.x];

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';
    defaults.yLabel = _config_[defaults.y];

    // color
    defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[ defaults.color ];

    // event callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => { console.log(datum); };

    // miscellaneous
    defaults.maintainAspectRatio = false;
    defaults.nSnapshots = 5;
    defaults.displayThresholds = false;

    const config = configureAll(defaults, _config_, {
        thresholds: checkThresholds.bind(null, _config_, _parameters_),
    });

    // annotation
    config.annotation = ['metric', 'score'].includes(config.y)
        ? 'numerator'
        : config.y;

    return config;
}
