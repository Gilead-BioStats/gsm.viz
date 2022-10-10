import coalesce from "../src/util/coalesce"

describe("utility functions", () => {

    test('coalese returns default when undefined value supplied',()  => {
        expect(coalesce(undefined, 'default')).not.toBeUndefined()
    })

    test('coalese returns value and not default when defined',()  => {
        expect(coalesce('value', 'default')).toBe('value')
    })

})