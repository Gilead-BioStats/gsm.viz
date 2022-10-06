import coalesce from '../util/coalesce';

export default function configure(_config_) {
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

    //
    config.threshold = coalesce(config.threshold, [
        { threshold: 7, flag: 2 },
        { threshold: -7, flag: -2 },
        { threshold: 5, flag: 1 },
        { threshold: -5, flag: -1 },
    ]);

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
