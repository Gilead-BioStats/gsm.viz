import schemata from './schema/index';
import getType from './checkInputs/getType';
import checkProps from './checkInputs/checkProps';

export default function checkInputs({
    parameter,
    argument,
    schemaName,
    module
}) {
    const schema = schemata[schemaName];

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
