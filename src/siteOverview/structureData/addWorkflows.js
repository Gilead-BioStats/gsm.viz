import defineTooltip from './defineTooltip';

export default function addWorkflows(rowDatum, value, workflows) {
    for (const workflow of workflows) {
        let cellDatum = value.get(workflow.workflowid);

        // Use a default workflow object if the workflow is not found.
        if (Array.isArray(cellDatum) && cellDatum.length > 0) {
            cellDatum = cellDatum[0];
        } else {
            cellDatum = { flag: 'NA' };
        }

        cellDatum.key = workflow.workflowid;
        cellDatum.value = Math.abs(parseFloat(cellDatum.score));
        cellDatum.text = '';
        cellDatum.type = 'kri icon tooltip';
        cellDatum.tooltip = true;
        cellDatum.tooltipContent = defineTooltip('kri', cellDatum, workflows);

        rowDatum.push(cellDatum);
    }

    return rowDatum;
};
