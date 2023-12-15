import falsy from './falsy.js';
import { ascending, color as d3color } from 'd3';

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
        color: '#ff0040',
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

// Calculate average of amber and red colors.
const amber = colorScheme.find((color) => color.flag.includes(1));
const red = colorScheme.find((color) => color.flag.includes(2));

colorScheme.amberRed = {
    color: `rgb(${Math.round((amber.rgba.r + red.rgba.r) / 2)},${Math.round(
        (amber.rgba.g + red.rgba.g) / 2
    )},${Math.round((amber.rgba.b + red.rgba.b) / 2)})`,
    order: -1,
    description: 'Amber or Red Flag',
    flag: [...amber.flag, ...red.flag].sort(ascending),
};
colorScheme.amberRed.rgba = d3color(colorScheme.amberRed.color);

export default colorScheme;
