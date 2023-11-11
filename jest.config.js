/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(@web3-storage)/)"],
};

export default config;
