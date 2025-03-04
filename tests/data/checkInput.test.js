import metricMetadata from '../../examples/data/metricMetadata.json';
import schema from '../../src/data/schema/metricMetadatum.json';
import checkInput from '../../src/data/checkInput.js';

describe('checkInput identifies required and optional properties', () => {
    test('a missing required analysis metadata property throws an error', () => {
        const metricMetadatum = metricMetadata[0];
        const requiredProps = Object.keys(schema.properties).filter(
            (key) => schema.properties[key].required === true
        );

        for (const prop of requiredProps) {
            const incompleteAnalysisMetadata = { ...metricMetadatum };
            delete incompleteAnalysisMetadata[prop];

            expect(() =>
                checkInput({
                    argument: incompleteAnalysisMetadata,
                    schemaName: 'metricMetadata',
                })
            ).toThrow(Error);
        }
    });

    test('a missing optional analysis metadata property returns argument', () => {
        const metricMetadatum = metricMetadata[0];
        const optionalProps = Object.keys(schema.properties).filter(
            (key) => schema.properties[key].required === false
        );

        for (const prop of optionalProps) {
            const incompleteAnalysisMetadata = { ...metricMetadatum };
            delete incompleteAnalysisMetadata[prop];

            // No error should be thrown.
            expect(
                checkInput({
                    argument: incompleteAnalysisMetadata,
                    schemaName: 'metricMetadatum',
                })
            ).toBeUndefined();
        }
    });
});
