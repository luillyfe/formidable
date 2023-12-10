/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(@web3-storage)/)"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svg.js",
  },
};

export default config;
