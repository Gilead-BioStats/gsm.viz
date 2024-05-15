import { select } from 'd3';

export default function addRowHighlighting(rows) {
    rows.on('mouseover', function () {
            select(this).style('background-color', 'lightgray');
        })
        .on('mouseout', function () {
            select(this).style('background-color', null);
        });
};
