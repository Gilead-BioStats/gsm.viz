const colors = {
    green: '#52C41A',
    yellow: '#FADB14',
    red: '#FF4D4F',
};

const thresholds = [
    {
        flag: [0],
        order: 0,
        color: colors.green,
        description: 'Within Thresholds',
    },
    {
        flag: [-1, 1],
        order: 1,
        color: colors.yellow,
        description: 'At Risk',
    },
    {
        flag: [-2, 2],
        order: 2,
        color: colors.red,
        description: 'Flagged',
    },
];

module.exports = { colors, thresholds };
