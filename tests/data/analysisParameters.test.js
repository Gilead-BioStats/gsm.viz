import analysisParameters from '../../examples/data/status_param.json';
import schema from '../../src/data/schema/analysisParameters.json';
import checkInput from '../../src/data/checkInput';
import getType from '../../src/data/checkInput/getType';

describe('analysis parameters schema', () => {
    test('analysis parameters schema type matches data type of analysis parameters', () => {
        let analysisParametersType = typeof analysisParameters;

        if (
            analysisParametersType === 'object' &&
            Array.isArray(analysisParameters)
        )
            analysisParametersType = 'array';

        expect(analysisParametersType).toBe(schema.type);
    });

    test('type of analysis parameters schema items matches data type of analysis parameters items', () => {
        const analysisParameter =
            analysisParameters[
                Math.floor(analysisParameters.length * Math.random())
            ];

        expect(typeof analysisParameter).toBe(schema.items.type);
    });

    test('properties of analysis parameters schema items match properties of analysis parameters items', () => {
        const analysisParameter =
            analysisParameters[
                Math.floor(analysisParameters.length * Math.random())
            ];
        const propsResult = Object.keys(analysisParameter).sort();
        const propsSchema = Object.keys(schema.items.properties).sort();

        expect(propsResult).toEqual(propsSchema);
    });
});
