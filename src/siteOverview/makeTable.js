export default function makeTable(rowData, workflows) {
    console.log(rowData);

    const columns = [
        'groupid',
        'invname',
        'status',
        'enrolled_participants',
        'nRedFlags',
        'nAmberFlags',
        ...workflows.map(workflow => workflow.workflowid)
    ];

    const headerLabels = [
        {
            key: 'groupid',
            text: 'Site ID',
        },
        {
            key: 'invname',
            text: 'Investigator',
        },
        {
            key: 'status',
            text: 'Status',
        },
        {
            key: 'enrolled_participants',
            text: 'Enrolled',
        },
        {
            key: 'nRedFlags',
            text: '# Red Flags',
        },
        {
            key: 'nAmberFlags',
            text: '# Amber Flags',
        },
        ...workflows.map(workflow => ({
            key: workflow.workflowid,
            text: workflow.abbreviation
        }))
    ];

    // create table
    const table = d3.select('body').append('table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    thead.append('tr')
        .selectAll('th')
        .data(headerLabels)
        .join('th')
        .text(d => d.text);

    const rows = tbody.selectAll('tr')
        .data(rowData)
        .join('tr');

    rows.selectAll('td')
        .data(d => d, d => d.key)
        .join('td')
        .text(d => d.text === 'NA' ? '-' : d.text)
        .attr('class', d => d.type)
        .attr('title', d => d.tooltip
            ? Object.entries(d).map(([key, value]) => `${key}: ${value}`).join('\n')
            : null
        )
        .style('cursor', d => d.tooltip ? 'help' : null);

    // add traffic light coloring to cells
    rows.selectAll('td.kri')
        .style('background-color', function(d, i) {
            switch (Math.abs(parseInt(d.flag))) {
                case 0:
                    return 'green';
                case 1:
                    return 'yellow';
                case 2:
                    return 'red';
                default:
                    return '#eee';
            }
        });


    // add row highlighting
    tbody.selectAll('tr')
        .on('mouseover', function() {
            d3.select(this).style('background-color', 'lightgray');
        })
        .on('mouseout', function() {
            d3.select(this).style('background-color', null);
        });

    // add column sorting
    thead.selectAll('th')
        .on('click', function(event, d) {
            const i = headerLabels.findIndex(di => di.key === d.key);
            const sortAscending = this.classList.contains('ascending');
            const sortKey = d.value;

            // TODO: handle sorting by non-numeric and missing values
            tbody.selectAll('tr')
                .sort((a, b) => {
                    if (sortAscending) {
                        return a[i].value - b[i].value;
                    } else {
                        return b[i].value - a[i].value;
                    }
                });

            this.classList.toggle('ascending', !sortAscending);
        });

    // add tooltips to column headers
    thead.selectAll('th')
        .filter(d => /^kri/.test(d.key))
        .attr('title', function(d) {
            const workflow = workflows.find(workflow => workflow.workflowid === d.key);

            return workflow.metric;
        })
        .style('cursor', 'help');

    return(table);
}
