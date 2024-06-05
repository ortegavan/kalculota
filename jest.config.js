module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/test.ts'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transform: {
        '^.+\\.(ts|html)$': [
            'jest-preset-angular',
            {
                tsconfig: 'tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    coverageReporters: ['html'],
};
