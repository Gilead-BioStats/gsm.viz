import configureAll from '../util/configure.js';

export default function configure(_config_) {
    const defaults = {};

    defaults.GroupLevel = 'Site';
    defaults.groupLabelKey = null;
    defaults.groupParticipantCountKey = 'ParticipantCount';
    defaults.groupTooltipKeys = null;

    // callbacks
    defaults.groupClickCallback = (datum) => {
        console.log(datum);
    };
    defaults.metricClickCallback = (datum) => {
        console.log(datum);
    };

    const config = configureAll(defaults, _config_);

    return config;
}
