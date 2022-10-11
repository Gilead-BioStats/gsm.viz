import coalesce from '../util/coalesce';

export default function configure(_config_, thresholds = false) {
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

    // n
    config.n = coalesce(config.n, 'n');
    config.nLabel = coalesce(config.nLabel, config[config.n]);

    // numerator
    config.num = 'numerator';
    config.numeratorLabel = coalesce(config.numeratorLabel, config[config.num]);

    // denominator
    config.denom = 'denominator';
    config.denomionatorLabel = coalesce(
        config.denominatorLabel,
        config[config.denom]
    );

    console.log(thresholds);
    if (thresholds) {
        config.threshold = thresholds
            .filter((d) => d.workflowid == config['workflowid'])
            .filter((d) => d.param === 'vThreshold')
            .map((d) => {
                return {
                    threshold: d.default,
                    flag:
                        (Math.abs(+d.default) <= 5 ? '1' : '2') *
                        Math.sign(d.default),
                };
            });
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
