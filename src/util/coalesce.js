export default function coalesce(a, b) {
    if ([null, undefined].includes(a))
        return b;

    if (Array.isArray(b) && !Array.isArray(a))
        a = [a];

    if (typeof a === typeof b)
        return a;

    return b;
}
