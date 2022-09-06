import coalesce from '../util/coalesce';

export default function configure(_config_) {
    const config = { ..._config_ };

    // x-axis
    config.x = coalesce(config.x, 'denominator');
    config.xLabel = coalesce(config.xLabel, config[config.x]);

    // y-axis
    config.y = coalesce(config.y, 'numerator');
    config.yLabel = coalesce(config.yLabel, config[config.y]);

    // color
    config.color = coalesce(config.flag, 'flag');
    config.colors = coalesce(config.colors, ['rgba(224,224,224,0.5)', '#d6604d']);

    return config;
}
