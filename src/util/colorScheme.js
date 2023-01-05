import { color as d3color } from 'd3';
import falsy from './falsy';

const colorScheme = [
    {
        color: '#52C41A',
        order: 0,
        description: 'Green Flag',
        flag: [0],
    },
    {
        color: '#FFBF00',
        order: 1,
        description: 'Amber Flag',
        flag: [-1, 1],
    },
    {
        color: '#FF4D4F',
        order: 2,
        description: 'Red Flag',
        flag: [-2, 2],
    },
    {
        color: '#aaaaaa',
        order: 3,
        description: 'No Flag',
        flag: falsy,
    },
];

colorScheme.forEach((color) => {
    color.rgba = d3color(color.color);
});

export default colorScheme;
