import { select } from 'd3';

import structureData from './structureData.js';

import addBodyRows from './makeTable/addBodyRows.js';
import addCells from './makeTable/addCells.js';

import identifyInactiveSites from './makeTable/identifyInactiveSites.js';
import addTrafficLighting from './makeTable/addTrafficLighting.js';
import addFlagIcons from './makeTable/addFlagIcons.js';
import addRowHighlighting from './makeTable/addRowHighlighting.js';
import addClickEvents from './makeTable/addClickEvents.js';

export default function updateTable(
    _results_
) {
    console.log(this.columns.map(d => d.sortState));

    const rows = structureData(
        _results_,
        this.columns,
        this.sites,
        this._workflows_
    );

    // create table
    const bodyRows = addBodyRows(this.table.select('tbody'), rows);
    const cells = addCells(bodyRows);

    // identify inactive sites
    identifyInactiveSites(bodyRows);

    // add traffic light coloring to cells
    addTrafficLighting(bodyRows);

    // add directional arrows to KRI cells
    addFlagIcons(bodyRows);

    // add row highlighting
    addRowHighlighting(bodyRows);

    // add click events
    addClickEvents(bodyRows, cells, this.config);
}
