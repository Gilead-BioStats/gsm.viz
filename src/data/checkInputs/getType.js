// get data type of variable
export default function getType(variable) {
    let variableType = typeof variable;

    if (variable instanceof Array)
        variableType = 'array';

    if (variable instanceof Map)
        variableType = 'map';

    if (variable instanceof Set)
        variableType = 'set';

    if (variable instanceof Function)
        variableType = 'function';

    return variableType;
}
