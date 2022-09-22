const colors = {
    green: '#52C41A',
    yellow: '#FADB14',
    red: '#FF4D4F',
};

const thresholds = [
    {
        flag: [-2, 2],
        color: colors.red,
        description: 'Flagged',
    },
    {
        flag: [-1, 1],
        color: colors.yellow,
        description: 'At Risk',
    },
    {
        flag: [0],
        color: colors.green,
        description: 'Sites Not Flagged Or At Risk',
    },
];

module.exports = { thresholds };
