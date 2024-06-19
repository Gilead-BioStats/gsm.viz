import { select } from 'd3';

import addHeaderRow from './makeTable/addHeaderRow.js';
import addBodyRows from './makeTable/addBodyRows.js';
import addCells from './makeTable/addCells.js';
import addSorting from './makeTable/addSorting.js';

import addTrafficLighting from './makeTable/addTrafficLighting.js';
import addFlagIcons from './makeTable/addFlagIcons.js';
import addRowHighlighting from './makeTable/addRowHighlighting.js';
import addClickEvents from './makeTable/addClickEvents.js';

export default function makeTable(_element_, rows, columns, config) {
    // create table
    const table = select(_element_).append('table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');
    const headerRow = addHeaderRow(thead, columns);
    const bodyRows = addBodyRows(tbody, rows);
    const cells = addCells(bodyRows);

    // add column sorting
    addSorting(headerRow, tbody, columns);

    // add traffic light coloring to cells
    addTrafficLighting(bodyRows);

    // add directional arrows to KRI cells
    addFlagIcons(bodyRows);

    // add row highlighting
    addRowHighlighting(bodyRows);

    // add click events
    addClickEvents(bodyRows, cells, config);

    return table;
}
