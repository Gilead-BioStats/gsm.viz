import { select } from 'd3';

import getHeaderLabels from './makeTable/getHeaderLabels.js';
import addHeaderTooltips from './makeTable/addHeaderTooltips.js';
import addSorting from './makeTable/addSorting.js';

import addTrafficLighting from './makeTable/addTrafficLighting.js';
import addFlagIcons from './makeTable/addFlagIcons.js';
import addRowHighlighting from './makeTable/addRowHighlighting.js';

export default function makeTable(_element_, rowData, workflows) {
    const columns = [
        'groupid',
        'invname',
        'status',
        'enrolled_participants',
        'nRedFlags',
        'nAmberFlags',
        ...workflows.map((workflow) => workflow.workflowid),
    ];

    const headerLabels = getHeaderLabels(columns, workflows);

    // create table
    const table = select(_element_).append('table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    thead
        .append('tr')
        .selectAll('th')
        .data(headerLabels)
        .join('th')
        .text((d) => d.text);

    const rows = tbody.selectAll('tr').data(rowData).join('tr');

    rows.selectAll('td')
        .data(
            (d) => d,
            (d) => d.key
        )
        .join('td')
        .text((d) => (d.text === 'NA' ? '-' : d.text))
        .attr('class', (d) => d.type)
        .attr('title', (d) =>
            d.tooltip
                ? Object.entries(d)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join('\n')
                : null
        );

    // add tooltips to column headers
    addHeaderTooltips(thead, workflows);

    // add column sorting
    addSorting(thead, tbody, headerLabels);

    // embolden active site IDs
    rows.selectAll('td.site.string.tooltip')
        .style('font-weight', d => d.status === 'Active' ? 'bold' : 'normal');

    // add traffic light coloring to cells
    addTrafficLighting(rows);

    // add directional arrows to KRI cells
    addFlagIcons(rows);

    // add row highlighting
    addRowHighlighting(rows);

    return table;
}
