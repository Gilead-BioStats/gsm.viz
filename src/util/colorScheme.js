import falsy from './falsy.js';
import { ascending, color as d3color } from 'd3';

/**
 * An array of color schemes for different flag states in the application.
 * Each object represents a color scheme with metadata, including a color
 * value, order, description, and associated flag states. It also calculates
 * RGBA values for each color using the d3color utility and computes a special
 * 'amberRed' color for amber or red flag combinations.
 *
 * @typedef {Object} ColorScheme
 * @property {string} color - Hexadecimal color string (e.g., "#3DAF06").
 * @property {number} order - The order in which the color appears in the
 *                            scheme.
 * @property {string} description - A brief description of the flag's meaning.
 * @property {Array|falsy} Flag - An array of flag states associated with the
 *                                color, or `falsy` for no flag.
 * @property {Object} rgba - The RGBA value of the color computed using d3color.
 *
 * @type {Array<ColorScheme>}
 *
 * @property {Object} amberRed - A computed color scheme that represents both
 *                               amber and red flags combined.
 * @property {string} amberRed.color - The average color between amber and red
 *                                     flags.
 * @property {number} amberRed.order - The order of the combined flag scheme.
 * @property {string} amberRed.description - Describes the combination of amber
 *                                           and red flags.
 * @property {Array} amberRed.Flag - An array containing flag values for both
 *                                   amber and red flags.
 * @property {Object} amberRed.rgba - The RGBA value of the computed amberRed
 *                                    color.
 *
 * @property {Object} green - Alias for the Green Flag color scheme.
 * @property {Object} amber - Alias for the Amber Flag color scheme.
 * @property {Object} red - Alias for the Red Flag color scheme.
 * @property {Object} gray - Alias for the No Flag (falsy) color scheme.
 */
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

// Assign RGBA values for each color
colorScheme.forEach((color) => {
    color.rgba = d3color(color.color);
});

// Add aliases for easy access
colorScheme.green = colorScheme.find(c => c.order === 0);
colorScheme.amber = colorScheme.find(c => c.order === 1);
colorScheme.red = colorScheme.find(c => c.order === 2);
colorScheme.gray = colorScheme.find(c => c.Flag === falsy);

// Calculate and assign amberRed color
const amber = colorScheme.amber;
const red = colorScheme.red;

colorScheme.amberRed = {
    color: `rgb(${Math.round((amber.rgba.r + red.rgba.r) / 2)},${Math.round(
        (amber.rgba.g + red.rgba.g) / 2
    )},${Math.round((amber.rgba.b + red.rgba.b) / 2)})`,
    order: -1,
    description: 'Amber or Red Flag',
    Flag: [...amber.Flag, ...red.Flag].sort(ascending),
    rgba: d3color(`rgb(${Math.round((amber.rgba.r + red.rgba.r) / 2)},${Math.round(
        (amber.rgba.g + red.rgba.g) / 2
    )},${Math.round((amber.rgba.b + red.rgba.b) / 2)})`)
};

export default colorScheme;
