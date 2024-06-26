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
    // add click event to Metric cells
    cells.filter('.metric').on('click', function (event, d) {
        config.metricClickCallback({
            GroupLevel: config.groupLevel,
            GroupID: d.GroupID,
            MetricID: d.MetricID,
        });
    });

    // add click event to group cells
    cells.filter('.site').on('click', function (event, d) {
        config.groupClickCallback({
            GroupLevel: config.groupLevel,
            GroupID: d.SiteID,
        });
    });
}
