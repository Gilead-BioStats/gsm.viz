module.exports = {
    //moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    //env: 'jsdom',
    //extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/examples/'],
    //testPathPattern: '/tests/',
    //testEnvironment: 'jest-environment-node',
    //transform: {},
    transformIgnorePatterns: [
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ]
}
