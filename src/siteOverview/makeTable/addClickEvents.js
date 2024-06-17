/**
 * Add click events to the cells of the table.
 *
 * @param {object} bodyRows - The rows of the table body.
 * @param {object} cells - The cells of the table.
 * @param {object} _config_ - The configuration object.
 *
 * @returns {void}
 */ 
export default function addClickEvents(bodyRows, cells, _config_) {
    cells.on('click', function(event, d) {
        const datum = d.column.type === 'kri'
            ? {
                groupid: d.groupid,
                metricid: d.workflowid,
            } : {
                groupid: d.siteid,
            };

        _config_.clickCallback(datum);
    });
}
