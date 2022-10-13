import coalesce from '../util/coalesce';
import colorScheme from '../util/colorScheme';

export default function configure(_config_) {
    const config = { ..._config_ };
    config.type = 'scatter';

    // x-axis
    config.x = coalesce(config.x, 'denominator');
    config.xLabel = coalesce(config.xLabel, config[config.x]);
    config.xType = coalesce(config.xType, 'logarithmic');

    // y-axis
    config.y = coalesce(config.y, 'numerator');
    config.yLabel = coalesce(config.yLabel, config[config.y]);
    config.yType = coalesce(config.yType, 'linear');

    // color
    config.color = coalesce(config.flag, 'flag');
    config.colorScheme = coalesce(config.colorScheme, colorScheme);

    // display of trend line (center green bound line)
    config.displayTrendLine = coalesce(config.displayTrendLine, false);

    // selected group IDs
    config.selectedGroupIDs = coalesce(config.selectedGroupIDs, []);

    // event callbacks
    config.hoverCallback = coalesce(config.hoverCallback, (datum) => {});
    config.clickCallback = coalesce(config.clickCallback, (datum) =>
        console.table(datum)
    );

    // sizing
    config.maintainAspectRatio = coalesce(config.maintainAspectRatio, false);

    return config;
}
