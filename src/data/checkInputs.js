import schemata from './schema/index';
import getType from './checkInputs/getType';
import checkProps from './checkInputs/checkProps';

export default function checkInputs({
    parameter = null,
    argument = null,
    schemaName = null,
    module = null,
    verbose = false
}) {
    const schema = schemata[schemaName];

    if (argument === null) {
        if (verbose)
            console.log(`[ ${ parameter } ] unspecified. Terminating execution of [ checkInputs() ].`);

        return;
    }

    if (schemaName === 'flagCounts') {
        if (Object.keys(argument[0]).includes('groupid'))
            delete schema.items.properties.workflowid;

        if (Object.keys(argument[0]).includes('workflowid'))
            delete schema.items.properties.groupid;
    }
    console.log(parameter);
    console.log(schemaName);
    console.log(schema);

    // check data type of argument
    const argumentType = getType(argument);
    if (argumentType !== schema.type) {
        throw `Incorrect data type: [ ${
            schema.type
        } ] expected but [ ${
            argumentType
        } ] detected for [ ${
            parameter
        } ] argument to [ ${
            module
        }() ].`;
    }

    // check items in array
    if (schema.type === 'array') {
        argument.forEach((item, i) => {
            // check data type of item
            const itemType = getType(item);

            if (itemType !== schema.items.type) {
                throw `Incorrect data type: [ ${
                    schema.items.type
                } ] expected but [ ${
                    itemType
                } ] detected for item ${
                    i
                } of [ ${
                    parameter
                } ] argument to [ ${
                    module
                }() ].`
            }

            // check properties in object
            if (schema.items.type === 'object') {
                const properties = schema.items.properties;
                checkProps({
                    obj: item,
                    properties,
                    parameter,
                    module,
                    i
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
            module
        });
    }
}
