/**
 * Add click events to the cells of the table.
 *
 * @param {object} bodyRows - The rows of the table body.
 * @param {object} cells - The cells of the table.
 * @param {object} _config_ - The configuration object.
 *
 * @returns {void}
 */
export default function addClickEvents(bodyRows, cells, config) {
    // add click event to KRI cells
    cells.filter('.kri').on('click', function (event, d) {
        config.metricClickCallback({
            GroupLevel: config.GroupLevel,
            GroupID: d.GroupID,
            MetricID: d.MetricID,
        });
    });

    // add click event to group cells
    cells.filter('.group').on('click', function (event, d) {
        config.groupClickCallback({
            GroupLevel: config.GroupLevel,
            GroupID: d.GroupID,
        });
    });
}
