export const setupFilesAfterEnv = ["<rootDir>/setupTests.js"];

export const transform = {
  "^.+\\.(js|jsx)$": "babel-jest",
};

export const moduleNameMapper = {
  "\\.(css|less)$": "identity-obj-proxy",
};
