import schemata from './schema/index.js';
import getType from './checkInput/getType.js';
import checkProps from './checkInput/checkProps.js';

/**
 * Check argument to module against corresponding schema.
 *
 * @constructor
 * @param {Object} input - Input to module.
 * @param {string} input.parameter - Name of module parameter
 * @param {Object|Array} input.argument - Argument passed to module
 * @param {string} input.schemaName - Name of schema against which to check argument
 * @param {string} input.module - Name of module that receives argument
 * @param {boolean} input.verbose - Print diagnostic messages to the console
 *
 * @returns {void}
 */
export default function checkInput({
    parameter = null,
    argument = null,
    schemaName = null,
    module = null,
    verbose = false,
}) {
    // check if schemaName is null
    if (schemaName === null) {
        if (verbose)
            console.log(
                `[ ${schemaName} ] unspecified. Terminating execution of [ checkInputs() ].`
            );

        return;
    }

    // check if schema exists
    if (!Object.keys(schemata).includes(schemaName)) {
        throw new Error(`Schema [ ${schemaName} ] not found.`);
    }

    const schema = JSON.parse(JSON.stringify(schemata[schemaName]));

    // Check whether parameter is required for module.
    if (Object.keys(schema.modules).includes(module)) {
        const required = schema.modules[module].required;

        // check if [ argument ] is "missing"
        if ([undefined, null].includes(argument)) {
            if (required) {
                throw new Error(
                    `Missing value: [ ${parameter} ] argument to [ ${module}() ] is required.`
                );
            } else {
                if (verbose)
                    console.log(
                        `[ ${parameter} ] unspecified. Terminating execution of [ checkInputs() ].`
                    );

                return;
            }
        }
    } else {
        if (verbose)
            console.log(
                `Module [ ${module} ] not referenced in schema [ ${schemaName} ].`
            );
    }

    // Add snapshot date to cross-section schema for time series module.
    if (
        module === 'timeSeries' &&
        ['flagCounts', 'results', 'resultsVertical'].includes(schemaName)
    ) {
        schema.items.properties.SnapshotDate = schemata.snapshotDate;
    }

    // check data type of argument
    const argumentType = getType(argument);
    if (argumentType !== schema.type) {
        throw new Error(
            `Incorrect data type: [ ${schema.type} ] expected but [ ${argumentType} ] detected for [ ${parameter} ] argument to [ ${module}() ].`
        );
    }

    // check items in array
    if (schema.type === 'array') {
        // check for empty array
        if (argument.length === 0) {
            if (verbose) {
                console.log(
                    `Empty array: [ ${parameter} ] argument to [ ${module}() ] contains zero elements.`
                );
            }
        }

        argument.forEach((item, i) => {
            // check data type of item
            const itemType = getType(item);

            if (itemType !== schema.items.type) {
                throw new Error(
                    `Incorrect data type: [ ${schema.items.type} ] expected but [ ${itemType} ] detected for item ${i} of [ ${parameter} ] argument to [ ${module}() ].`
                );
            }

            // check properties in object
            if (schema.items.type === 'object') {
                const properties = schema.items.properties;
                checkProps({
                    obj: item,
                    properties,
                    parameter,
                    module,
                    i,
                });
            }
        });
    }

    // check properties in object
    if (schema.type === 'object') {
        const properties = schema.properties;
        checkProps({
            obj: argument,
            properties,
            parameter,
            module,
        });
    }
}
