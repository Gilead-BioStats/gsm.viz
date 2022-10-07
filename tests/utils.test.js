import coalesce from "../src/util/coalesce"

describe("utility functions", () => {

    test('coalese returns default when null value supplied',()  => {
        expect(coalesce(null, 'default')).toBe('default')
    })

    test('coalese returns value and not default when defined',()  => {
        expect(coalesce('value', 'default')).toBe('value')
    })

})