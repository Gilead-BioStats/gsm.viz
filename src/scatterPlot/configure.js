import coalesce from '../util/coalesce';
import { colors } from '../util/colors';

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
    config.colors = coalesce(
        config.colors,
        Object.keys(colors).map((key) => colors[key])
    );

    // selected group IDs
    config.selectedGroupIDs = coalesce(
        config.selectedGroupIDs,
        []
    );

    return config;
}
