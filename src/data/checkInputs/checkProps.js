// check properties in object
export default function checkProps({
    obj,
    properties,
    parameter = null,
    module = null,
    i = null,
}) {
    const actualProps = Object.keys(obj);
    const expectedProps = Object.keys(properties);
    const requiredProps = expectedProps.filter(
        (prop) => properties[prop].required
    );

    for (const prop of requiredProps) {
        if (actualProps.includes(prop) === false) {
            let message = `Missing property: [ ${prop} ] expected but not found`;

            if (i !== null) message = `${message} in item ${i}`;

            if (parameter !== null)
                message = `${message} ${
                    i === null ? 'in' : 'of'
                } [ ${parameter} ] argument`;

            if (module !== null) message = `${message} to [ ${module}() ]`;

            throw `${message}.`;
        }
    }
}
