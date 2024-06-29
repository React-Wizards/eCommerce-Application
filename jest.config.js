export default {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(svg|jpg|jpeg|png)$': '<rootDir>/fileTransformer.ts',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
