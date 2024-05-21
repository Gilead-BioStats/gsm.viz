export default function identifyInactiveSites(rows) {
    rows.selectAll('td.siteid')
        .style('text-decoration', d => d.status === 'Active' ? null : 'line-through');
};
