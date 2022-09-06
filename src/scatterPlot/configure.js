import coalesce from '../util/coalesce';

export default function configure(_config_) {
    const config = { ..._config_ };

    // x-axis
    config.x = coalesce(config.x, 'denominator');
    config.xLabel = coalesce(config.xLabel, config[config.x]);

    // y-axis
    config.y = coalesce(config.y, 'numerator');
    config.yLabel = coalesce(config.yLabel, config[config.y]);

    // miscellaneous
    config.color = coalesce(config.flag, 'flag');

    return config;
}
