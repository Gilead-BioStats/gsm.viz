export default function identifyInactiveSites(rows) {
    rows.selectAll('td.site.string.tooltip')
        .style('text-decoration', d => d.status === 'Active' ? null : 'line-through');
};
