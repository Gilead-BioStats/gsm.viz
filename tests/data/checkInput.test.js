import data from '../../examples/data/meta_workflow.json';
import schema from '../../src/data/schema/analysisMetadata.json';
import checkInput from '../../src/data/checkInput.js';

describe('checkInput identifies required and optional properties', () => {
    test('a missing required analysis metadata property throws an error', () => {
        const analysisMetadata = data[0];
        const requiredProps = Object.keys(schema.properties).filter(
            (key) => schema.properties[key].required === true
        );

        for (const prop of requiredProps) {
            const incompleteAnalysisMetadata = { ...analysisMetadata };
            delete incompleteAnalysisMetadata[prop];

            expect(() =>
                checkInput({
                    argument: incompleteAnalysisMetadata,
                    schemaName: 'analysisMetadata',
                })
            ).toThrow(Error);
        }
    });

    test('a missing optional analysis metadata property returns argument', () => {
        const analysisMetadata = data[0];
        const requiredProps = Object.keys(schema.properties).filter(
            (key) => schema.properties[key].required === false
        );

        for (const prop of requiredProps) {
            const incompleteAnalysisMetadata = { ...analysisMetadata };
            delete incompleteAnalysisMetadata[prop];

            expect(
                checkInput({
                    argument: incompleteAnalysisMetadata,
                    schemaName: 'analysisMetadata',
                })
            ).toStrictEqual(incompleteAnalysisMetadata);
        }
    });
});
