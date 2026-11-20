import js from "@eslint/js";
import { readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import refresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import prettier from "eslint-config-prettier/flat";

const layers = ["app", "pages", "widgets", "features", "entities", "shared"];

export default defineConfig([
  globalIgnores(["dist/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{mjs,js}", "vite.config.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/*.tsx"],
    plugins: { "react-hooks": hooks, "react-refresh": refresh, "jsx-a11y": jsxA11y },
    rules: {
      ...hooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
    },
  },
  ...layers.slice(1, -1).flatMap((layer) => {
    const slices = readdirSync(new URL(`./src/${layer}/`, import.meta.url), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    const upperLayers = layers.slice(0, layers.indexOf(layer));
    const lowerSlices = layers.slice(layers.indexOf(layer) + 1, -1);
    return slices.map((slice) => ({
      files: [`src/${layer}/${slice}/**/*.{ts,tsx}`],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: upperLayers.map((upper) => `@/${upper}/**`),
                message: "FSD modules may only import from lower layers.",
              },
              ...(slices.length > 1
                ? [
                    {
                      group: slices
                        .filter((other) => other !== slice)
                        .flatMap((other) => [`@/${layer}/${other}`, `@/${layer}/${other}/**`]),
                      message: "FSD slices must not import sibling slices.",
                    },
                  ]
                : []),
              ...(lowerSlices.length
                ? [
                    {
                      group: lowerSlices.map((lower) => `@/${lower}/*/**`),
                      message: "Import through the slice public API, not implementation files.",
                    },
                  ]
                : []),
            ],
          },
        ],
      },
    }));
  }),
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: layers.slice(0, -1).map((layer) => `@/${layer}/**`),
              message: "Shared must not depend on application layers.",
            },
          ],
        },
      ],
    },
  },
  prettier,
]);
