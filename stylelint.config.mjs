/** @type {import('stylelint').Config} */
const config = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  ignoreFiles: ["node_modules/**", "dist/**"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
      { resolveNestedSelectors: true, message: "Use BEM naming: block__element--modifier" },
    ],
  },
};

export default config;
