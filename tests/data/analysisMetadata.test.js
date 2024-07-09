import analysisMetadata from '../../examples/data/meta_workflow.json';
import schema from '../../src/data/schema/analysisMetadata.json';
import checkInput from '../../src/data/checkInput.js';

describe('analysis metadata schema', () => {
    test('analysis metadata schema type matches data type of analysis metadata', () => {
        for (const analysisMetadatum of analysisMetadata) {
            expect(typeof analysisMetadatum).toBe(schema.type);
        }
    });

    test('analysis metadata schema properties match analysis metadata properties', () => {
        const propsSchema = Object.keys(schema.properties).sort();

        for (const analysisMetadatum of analysisMetadata) {
            const propsData = Object.keys(analysisMetadatum).sort();

            expect(propsSchema).toEqual(propsData);
        }
    });
});
