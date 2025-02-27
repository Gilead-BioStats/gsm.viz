import metricMetadata from '../../examples/data/metricMetadata.json';
import schema from '../../src/data/schema/metricMetadatum.json';
import checkInput from '../../src/data/checkInput.js';

describe('analysis metadata schema', () => {
    test('analysis metadata schema type matches data type of analysis metadata', () => {
        for (const analysisMetadatum of metricMetadata) {
            expect(typeof analysisMetadatum).toBe(schema.type);
        }
    });

    test('analysis metadata schema properties match analysis metadata properties', () => {
        const propsSchema = Object.keys(schema.properties).sort();

        for (const analysisMetadatum of metricMetadata) {
            const propsData = Object.keys(analysisMetadatum).sort();

            expect(propsSchema).toEqual(propsData);
        }
    });
});
