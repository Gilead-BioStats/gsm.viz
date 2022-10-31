import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';

export default function configure(_config_) {
    const defaults = {};

    defaults.type = 'line';

    // horizontal
    defaults.x = 'snapshot_date';
    //defaults.xType = 'logarithmic';
    defaults.xLabel = _config_[defaults.x];

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';
    defaults.yLabel = _config_[defaults.y];

    // color
    defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[ defaults.color ];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {};
    // event callbacks

    // miscellaneous
    defaults.maintainAspectRatio = false;
    defaults.nSnapshots = 5;

    const config = configureAll(defaults, _config_, {});

    // annotation
    config.annotation = ['metric', 'score'].includes(config.y)
        ? 'numerator'
        : config.y;

    return config;
}
