import falsy from './falsy.js';

export default function formatMetricTooltipTitle(result, config) {
    return result.group !== undefined
        ? `${config.GroupLevel}: ${result.GroupID} (${
              result.group.groupLabel
          } / ${result.group[config.groupParticipantCountKey]} enrolled)`
        : `${config.GroupLevel} ${result.GroupID}`;
}
