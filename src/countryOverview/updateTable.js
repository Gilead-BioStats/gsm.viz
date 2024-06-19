import { select } from 'd3';

import structureData from './structureData.js';

import addBodyRows from './makeTable/addBodyRows.js';
import addCells from './makeTable/addCells.js';

import addTrafficLighting from './makeTable/addTrafficLighting.js';
import addFlagIcons from './makeTable/addFlagIcons.js';
import addRowHighlighting from './makeTable/addRowHighlighting.js';
import addClickEvents from './makeTable/addClickEvents.js';

export default function updateTable(
    _results_
) {
    const rows = structureData(
        _results_,
        this.columns,
        this.countries,
        this._workflows_
    );

    // create table
    const tbody = this.table.select('tbody');
    const bodyRows = addBodyRows(tbody, rows);
    const cells = addCells(bodyRows);

    // add traffic light coloring to cells
    addTrafficLighting(bodyRows);

    // add directional arrows to KRI cells
    addFlagIcons(bodyRows);

    // add row highlighting
    addRowHighlighting(bodyRows);

    // add click events
    addClickEvents(bodyRows, cells, this.config);

    // preserve existing column sort
    const sortedColumn = this.columns.find(d => d.activeSort);
    if (sortedColumn !== undefined) {
        sortedColumn.sortState = -sortedColumn.sortState;
        sortedColumn.sort(tbody.selectAll('tr'), sortedColumn);
    }
}
