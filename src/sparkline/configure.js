import configureAll from '../util/configure.js';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs.js';
import checkThresholds from '../util/checkThresholds.js';
import coalesce from '../util/coalesce.js';

export default function configure(_config_, _data_, _thresholds_) {
    const defaults = {};

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'Score';
    defaults.yType = 'linear';

    // color
    defaults.color = 'Flag';

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
    config.annotation = ['Metric', 'Score'].includes(config.y)
        ? 'Numerator'
        : config.y;
    config.dataType = ['Metric', 'Score'].includes(config.y)
        ? 'continuous'
        : 'discrete';

    config.xLabel = coalesce(_config_.xLabel, 'Snapshot Date');
    config.yLabel = coalesce(_config_.yLabel, config[config.y]);
    config.chartName = `Sparkline of ${config.yLabel} by ${config.xLabel}`;

    return config;
}
