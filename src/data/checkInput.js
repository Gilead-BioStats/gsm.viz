import schemata from './schema/index';
import getType from './checkInput/getType';
import checkProps from './checkInput/checkProps';

/**
 * Check argument to module against corresponding schema.
 * @constructor
 * @param {Object} input - Input to module.
 * @param {string} input.parameter - Name of module parameter
 * @param {Object|Array} input.argument - Argument passed to module
 * @param {string} input.schemaName - Name of schema against which to check argument
 * @param {string} input.module - Name of module that receives argument
 * @param {boolean} input.verbose - Print diagnostic messages to the console
 */
export default function checkInput({
    parameter = null,
    argument = null,
    schemaName = null,
    module = null,
    verbose = false,
}) {
    if (argument === null) {
        if (verbose)
            console.log(
                `[ @param argument ] unspecified. Terminating execution of [ checkInputs() ].`
            );

        return;
    }

    if (schemaName === null) {
        if (verbose)
            console.log(
                `[ ${schemaName} ] unspecified. Terminating execution of [ checkInputs() ].`
            );

        return;
    }

    const schema = schemata[schemaName];

    if (argument === null) {
        if (verbose)
            console.log(
                `[ ${parameter} ] unspecified. Terminating execution of [ checkInputs() ].`
            );

        return;
    }

    if (schemaName === 'flagCounts') {
        if (Object.keys(argument[0]).includes('groupid'))
            delete schema.items.properties.workflowid;

        if (Object.keys(argument[0]).includes('workflowid'))
            delete schema.items.properties.groupid;
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

    return argument;
}
