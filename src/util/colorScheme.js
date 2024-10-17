import falsy from './falsy.js';
import { ascending, color as d3color } from 'd3';

const colorScheme = [
    {
        color: '#3DAF06',
        order: 0,
        description: 'Green Flag',
        Flag: [0],
    },
    {
        color: '#FEAA02',
        order: 1,
        description: 'Amber Flag',
        Flag: [-1, 1],
    },
    {
        color: '#FF5859',
        order: 2,
        description: 'Red Flag',
        Flag: [-2, 2],
    },
    {
        color: '#828282',
        order: 3,
        description: 'No Flag',
        Flag: falsy,
    },
];

colorScheme.forEach((color) => {
    color.rgba = d3color(color.color);
});

// Calculate average of amber and red colors.
const amber = colorScheme.find((color) => color.Flag.includes(1));
const red = colorScheme.find((color) => color.Flag.includes(2));

colorScheme.amberRed = {
    color: `rgb(${Math.round((amber.rgba.r + red.rgba.r) / 2)},${Math.round(
        (amber.rgba.g + red.rgba.g) / 2
    )},${Math.round((amber.rgba.b + red.rgba.b) / 2)})`,
    order: -1,
    description: 'Amber or Red Flag',
    Flag: [...amber.Flag, ...red.Flag].sort(ascending),
};
colorScheme.amberRed.rgba = d3color(colorScheme.amberRed.color);

export default colorScheme;
