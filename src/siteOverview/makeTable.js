import { select } from 'd3';

import addHeaderRow from './makeTable/addHeaderRow.js';
import addSorting from './makeTable/addSorting.js';

import identifyInactiveSites from './makeTable/identifyInactiveSites.js';
import addTrafficLighting from './makeTable/addTrafficLighting.js';
import addFlagIcons from './makeTable/addFlagIcons.js';
import addRowHighlighting from './makeTable/addRowHighlighting.js';

export default function makeTable(_element_, rows, columns) {
    // create table
    const table = select(_element_).append('table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // add header row
    const headerRow = addHeaderRow(thead, columns);

    // add body bodyRows
    const bodyRows = tbody.selectAll('tr').data(rows).join('tr');

    bodyRows.selectAll('td')
        .data(
            (d) => d,
            (d) => d.key
        )
        .join('td')
        .text((d) => (d.text === 'NA' ? '-' : d.text))
        .attr('class', (d) => d.class)
        .classed('tooltip', (d) => d.tooltip)
        .attr('title', (d) => d.tooltip ? d.tooltipContent: null);

    // add column sorting
    addSorting(thead, tbody, columns);

    // identify inactive sites
    identifyInactiveSites(bodyRows);

    // add traffic light coloring to cells
    addTrafficLighting(bodyRows);

    // add directional arrows to KRI cells
    addFlagIcons(bodyRows);

    // add row highlighting
    addRowHighlighting(bodyRows);

    return table;
}
