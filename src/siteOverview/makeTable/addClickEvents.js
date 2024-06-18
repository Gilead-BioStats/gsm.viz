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
    // add click event to KRI cells
    cells
        .filter('.kri')
        .on('click', function(event, d) {
            _config_.metricClickCallback({
                groupid: d.groupid,
                metricid: d.workflowid,
            });
        });

    // add click event to group cells
    cells
        .filter('.site')
        .on('click', function(event, d) {
            _config_.groupClickCallback({
                groupid: d.siteid,
            });
        });
}
