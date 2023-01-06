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
    const alternateProps = expectedProps.filter(
        (prop) => properties[prop].alternate !== undefined
    );

    for (const requiredProp of requiredProps) {
        // check that actual properties include required property
        if (actualProps.includes(requiredProp) === false) {
            // for required properties with alternates check that actual props includes alternate prop
            if (actualProps.some(actualProp => alternateProps.includes(actualProp)) === false) {
                let message = `Missing property: [ ${requiredProp} ] property expected but not found`;

                if (i !== null) message = `${message} in item ${i}`;

                if (parameter !== null)
                    message = `${message} ${
                        i === null ? 'in' : 'of'
                    } [ ${parameter} ] argument`;

                if (module !== null) message = `${message} to [ ${module}() ]`;

                throw new Error(`${message}.`);
            }
        }
    }
}
