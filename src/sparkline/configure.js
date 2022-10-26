import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../barChart/configure/checkThresholds';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    defaults.type = 'line';

    // horizontal
    defaults.x = 'snapshot_date';
    //defaults.xType = 'logarithmic';
    defaults.xLabel = _config_[defaults.x];

    // vertical
    defaults.y = 'metric';
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
    defaults.count = '';
    defaults.maintainAspectRatio = false;
    defaults.nSnapshots = 5;

    if (_config_.y === 'site') {
        defaults.count = 'site';
        _config_.y = null
        defaults.y = 'pct';
        defaults.aggregate = (snapshot) => snapshot
            .filter(d => +d.flag !== 0)
            .length;
    }

    if (_config_.y === 'kri') {
        defaults.count = 'kri';
        _config_.y = null
        defaults.y = 'n';
        defaults.aggregate = (snapshot) => snapshot
            .filter(d => +d.flag !== 0)
            .length;
    }

    const config = configureAll(defaults, _config_, {});

    return config;
}
