import coalesce from '../util/coalesce';
import getThresholdFlags from '../util/getThresholdFlags';

export default function configure(
    _config_,
    _thresholds_
) {
    const config = { ..._config_ };

    config.type = 'bar';

    // x-axis
    config.x = coalesce(config.x, 'groupid');
    config.xLabel = coalesce(config.xLabel, config['group']);

    // y-axis
    config.y = coalesce(config.y, 'score');
    config.yLabel = coalesce(config.yLabel, config[config.y]);

    // miscellaneous
    config.color = coalesce(config.flag, 'flag');
    config.colorLabel = coalesce(config.colorLabel, config[config.color]);

    // numerator
    config.num = 'numerator';
    config.numeratorLabel = coalesce(config.numeratorLabel, config[config.num]);

    // denominator
    config.denom = 'denominator';
    config.denominatorLabel = coalesce(
        config.denominatorLabel,
        config[config.denom]
    );

    if (_thresholds_) {
        const thresholds = _thresholds_
            .filter((d) => (
                d.workflowid === config.workflowid &&
                d.param === 'vThreshold'
            ))
            .map(d => d.default);

        const flags = getThresholdFlags(thresholds);
        config.threshold = flags;
    } else {
        config.threshold = null;
    }

    // selected group IDs
    config.selectedGroupIDs = coalesce(config.selectedGroupIDs, []);

    // Custom event callbacks
    config.hoverCallback = coalesce(config.hoverCallback, (datum) => {});
    config.clickCallback = coalesce(config.clickCallback, (datum) =>
        console.table(datum)
    );

    // sizing
    config.maintainAspectRatio = coalesce(config.maintainAspectRatio, false);

    return config;
}
