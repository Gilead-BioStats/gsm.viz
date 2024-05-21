export default function defineTooltip(type, content, workflows = null) {
    let tooltipKeys = {};

    switch (type) {
        case 'site':
            tooltipKeys = {
                'status': 'Status',

                'pi_last_name': 'Last Name',
                'pi_first_name': 'First Name',
                'siteid': 'Investigator ID',

                'institution': 'Site',
                'site_num': 'Site ID',
                'city': 'City',
                'state': 'State',
                'country': 'Country',

                'start_date': 'Activation Date',
                'is_satellite': 'Satellite',
            };

            break;
        case 'kri':
            tooltipKeys = {
                'score': 'KRI Score',
                'metric': 'KRI Metric',
                'numerator': 'Numerator',
                'denominator': 'Denominator',
            };

            break;
        default:
            tooltipKeys = Object.entries(d);

            break;
    }

    const tooltipContent = [];
    for (const [key, value] of Object.entries(tooltipKeys)) {
        if (content[key] !== undefined) {
            tooltipContent.push(`${value}: ${content[key]}`);
        }
    }

    return tooltipContent.join('\n');
};
