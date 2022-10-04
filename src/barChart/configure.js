import coalesce from '../util/coalesce';

export default function configure(_config_) {
    const config = { ..._config_ };

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

    config.threshold = [
        { threshold: 10, flag: 2 },
        { threshold: -10, flag: -2 },
        { threshold: 5, flag: 1 },
        { threshold: -5, flag: -1 },
    ];

    return config;
}
