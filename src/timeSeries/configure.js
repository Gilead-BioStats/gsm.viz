import colorScheme from '../util/colorScheme';
import configureAll from '../util/configure';
import coalesce from '../util/coalesce';
import checkSelectedGroupIDs from '../util/checkSelectedGroupIDs';
import checkThresholds from '../util/checkThresholds';

export default function configure(_config_, _data_, _thresholds_, _intervals_) {
    const defaults = {};

    defaults.dataType = /flag|risk/.test(_config_.y)
        ? 'discrete'
        : 'continuous';
    //defaults.dataType = this.dataType !== undefined
    //    ? this.dataType
    //    : /flag|risk/.test(_config_.y)
    //    ? 'discrete'
    //    : 'continuous';

    if (defaults.dataType === 'discrete')
        defaults.discreteUnit = Object.keys(_data_[0]).includes('groupid')
            ? 'KRI'
            : 'Site';
    else defaults.discreteUnit = null;

    defaults.type =
        defaults.dataType === 'discrete'
            ? 'aggregate'
            : _intervals_ !== null
            ? 'identity'
            : 'boxplot';
    defaults.tooltipType = 'scatter';
    //defaults.type = this.type !== undefined
    //    ? this.type
    //    : defaults.dataType === 'discrete'
    //    ? 'aggregate'
    //        : _intervals_ !== null
    //    ? 'identity'
    //    : 'boxplot';

    // horizontal
    defaults.x = 'snapshot_date';
    defaults.xType = 'category';

    // vertical
    defaults.y = 'score';
    defaults.yType = 'linear';

    // color
    //defaults.color = 'flag';
    defaults.colorScheme = colorScheme;
    //defaults.colorLabel = _config_[defaults.color];

    // callbacks
    defaults.hoverCallback = (datum) => {};
    defaults.clickCallback = (datum) => {
        console.log(datum);
    };

    // miscellaneous
    defaults.group = 'Site';
    defaults.aggregateLabel = 'Study';
    //defaults.displayTitle = false;
    defaults.maintainAspectRatio = false;
    //defaults.displayBoxplots = true;
    //defaults.displayViolins = false;
    //defaults.displayAmberFlags = true;
    //defaults.displayRedFlags = true;
    //defaults.displayThresholds = true;
    //defaults.displayTrendLine = true;

    _config_.variableThresholds = Array.isArray(_thresholds_)
        ? _thresholds_.some(
              (threshold) =>
                  threshold.gsm_analysis_date !==
                  _thresholds_[0].gsm_analysis_date
          )
        : false;

    const config = configureAll(defaults, _config_, {
        selectedGroupIDs: checkSelectedGroupIDs.bind(
            null,
            _config_.selectedGroupIDs,
            _data_
        ),
        thresholds: checkThresholds.bind(null, _config_, _thresholds_),
    });

    config.xLabel = coalesce(_config_.xLabel, 'Snapshot Date');
    const discreteUnits = config.dataType === 'discrete'
        ? `${config.discreteUnit.replace(/y$/, 'ie')}s`
        : '';
    config.yLabel = coalesce(
        _config_.yLabel,
        config.dataType === 'continuous'
            ? config[config.y]
            : /flag/.test(config.y) && /risk/.test(config.y)
            ? `Red or Amber ${discreteUnits}`
            : /flag/.test(config.y)
            ? `Red ${discreteUnits}`
            : /risk/.test(config.y)
            ? `Amber ${discreteUnits}`
            : ''
    );
    config.chartName = `Time Series of ${config.yLabel} by ${config.xLabel}`;

    return config;
}
