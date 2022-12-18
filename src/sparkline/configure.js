import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';
import coalesce from '../util/coalesce';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    defaults.type = 'line';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';

    // color
    defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[ defaults.color ];

    // event callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {
        console.log(datum);
    };

    // miscellaneous
    defaults.maintainAspectRatio = false;
    defaults.nSnapshots = 5;
    defaults.displayThresholds = false;

    // TODO: figure out why thresholds bombs on KRI switch in example.
    const config = configureAll(defaults, _config_, {
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    // annotation
    config.annotation = ['metric', 'score'].includes(config.y)
        ? 'numerator'
        : config.y;
    config.dataType = ['metric', 'score'].includes(config.y)
        ? 'continuous'
        : 'discrete';

    config.xLabel = coalesce(_config_.xLabel, 'Snapshot Date');
    config.yLabel = coalesce(_config_.yLabel, config[config.y]);
    console.log(config.thresholds);

    return config;
}
