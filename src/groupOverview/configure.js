import configureAll from '../util/configure.js';
import coalesce from '../util/coalesce.js';

export default function configure(_config_, _data_) {
    const defaults = {};

    defaults.GroupLevel = 'Site';

    // callbacks
    defaults.groupClickCallback = (datum) => {
        console.log(datum);
    };
    defaults.metricClickCallback = (datum) => {
        console.log(datum);
    };

    const groupLabelKey = {
        Site: 'InvestigatorLastName',
        Country: null,
        Study: 'nickname',
    };

    const groupTooltipKeys = {
        Site: {
            GroupID: 'Investigator ID',
            ParticipantCount: 'Participant Count',
            //SiteCount: 'Site Count',

            InvestigatorLastName: 'Last Name',
            InvestigatorFirstName: 'First Name',
            Status: 'Status',

            site_num: 'Site ID',
            account: 'Site',
            City: 'City',
            State: 'State',
            Country: 'Country',

            site_active_dt: 'Activation Date',
            is_satellite: 'Satellite',
        },
        Country: {
            GroupID: 'Country Code',
            ParticipantCount: 'Participant Count',
            SiteCount: 'Site Count',
        },
        Study: {
            GroupID: 'Protocol ID',
            ParticipantCount: 'Participant Count',
            SiteCount: 'Site Count',
        },
    };

    const config = configureAll(defaults, _config_);
    config.groupLabelKey = groupLabelKey[config.GroupLevel];
    config.groupTooltipKeys = groupTooltipKeys[config.GroupLevel];

    return config;
}
