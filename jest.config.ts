import { Config } from '@jest/types';

export default {
	preset: 'ts-jest',
	clearMocks: true,
	moduleFileExtensions: ['ts', 'js', 'json'],
	modulePathIgnorePatterns: ['<rootDir>/package.json'],
	transform: {
		'^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
} as Config.InitialOptions;
