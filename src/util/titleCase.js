export default function titleCase(value) {
    // title-case key:
    // - replace underscores with spaces
    // - insert spaces between camelCase words
    // - capitalize first letter of each word
    // - replace 'Id' with 'ID'
    return value
        .replace(/_/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace('Id', 'ID');
}
