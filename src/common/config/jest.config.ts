module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@modules/(.*)$': '<rootDir>/src/modules/$1',
		'^@common/(.*)$': '<rootDir>/src/common/$1',
	},
	roots: ['<rootDir>/src'],
	testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
