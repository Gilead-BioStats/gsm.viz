import coalesce from '../util/coalesce';

export default function configure(_config_) {
    const config = { ..._config_ };
    // x-axis
    config.x = coalesce(config.x, 'groupid');
    config.xLabel = coalesce(config.xLabel, config[config.x]);

    // y-axis
    config.y = coalesce(config.y, 'score');
    config.yLabel = coalesce(config.yLabel, config[config.y]);

    // miscellaneous
    config.color = coalesce(config.flag, 'flag');

    // n
    config.n = coalesce(config.n, 'n');
    config.nLabel = coalesce(config.nLabel, config[config.n]);

    return config;
}
