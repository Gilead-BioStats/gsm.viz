export default function coalesce(a, b) {
    return ![null, undefined].includes(a) ? a : b;
}
