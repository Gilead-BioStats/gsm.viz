import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';

export default function configure(_config_, _data_) {
    const defaults = {};

    defaults.type = 'scatter';

    // horizontal
    defaults.x = 'denominator';
    defaults.xType = 'logarithmic';
    defaults.xLabel = _config_[ defaults.x ];

    // vertical
    defaults.y = 'numerator';
    defaults.yType = 'linear';
    defaults.yLabel = _config_[ defaults.y ];

    // color
    defaults.color = 'flag';
    defaults.colorScheme = colorScheme;

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {};

    // miscellaneous
    defaults.displayTitle = false;
    defaults.displayTrendLine = false;
    defaults.maintainAspectRatio =  false;

    const config = configureAll(
        defaults,
        _config_,
        {
            selectedGroupIDs: checkSelectedGroupIDs
                .bind(null, _config_.selectedGroupIDs, _data_)
        }
    );

    return config;
}
