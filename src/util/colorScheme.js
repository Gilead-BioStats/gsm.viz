import { color as d3color } from 'd3';

const colorScheme = [
    {
        color: '#52C41A',
        order: 0,
        description: 'Within Thresholds',
        flag: [0],
    },
    {
        color: '#FADB14',
        order: 1,
        description: 'At Risk',
        flag: [-1, 1],
    },
    {
        color: '#FF4D4F',
        order: 2,
        description: 'Flagged',
        flag: [-2, 2],
    },
];

colorScheme.forEach((color) => {
    color.rgba = d3color(color.color);
});

export default colorScheme;
