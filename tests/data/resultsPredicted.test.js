import resultsPredicted from '../../examples/data/resultsPredicted.json';
import schema from '../../src/data/schema/resultsPredicted.json';
import checkInput from '../../src/data/checkInput.js';
import getType from '../../src/data/checkInput/getType.js';

describe('predicted analysis results schema', () => {
    test('predicted analysis results schema type matches data type of predicted analysis results', () => {
        let resultsPredictedType = typeof resultsPredicted;

        if (
            resultsPredictedType === 'object' &&
            Array.isArray(resultsPredicted)
        )
            resultsPredictedType = 'array';

        expect(resultsPredictedType).toBe(schema.type);
    });

    test('type of predicted analysis results schema items matches data type of predicted analysis results items', () => {
        const resultPredicted =
            resultsPredicted[
                Math.floor(resultsPredicted.length * Math.random())
            ];

        expect(typeof resultPredicted).toBe(schema.items.type);
    });

    test('properties of predicted analysis results schema items match properties of predicted analysis results items', () => {
        const resultPredicted =
            resultsPredicted[
                Math.floor(resultsPredicted.length * Math.random())
            ];
        const propsResult = Object.keys(resultPredicted).sort();
        const propsSchema = Object.keys(schema.items.properties).sort();

        expect(propsResult).toEqual(propsSchema);
    });
});
