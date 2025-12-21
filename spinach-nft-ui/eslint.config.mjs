import path from "node:path";
import {fileURLToPath} from "node:url";

import {FlatCompat} from "@eslint/eslintrc";
import {defineConfig} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...compat.extends("plugin:tailwindcss/recommended"),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[_]+$",
          argsIgnorePattern: "^[_]+$",
          ignoreRestSiblings: true,
        },
      ],
      "unused-imports/no-unused-imports": "error",
      indent: ["error", 2, {ignoredNodes: ["TSTypeParameterInstantiation"], MemberExpression: 1}],
      "linebreak-style": ["error", "unix"],
      "max-len": ["error", {code: 119}],
      "no-console": ["error", {allow: ["warn", "error"]}],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [{pattern: "react", group: "external", position: "before"}],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {order: "asc", caseInsensitive: true},
        },
      ],
      "import/newline-after-import": ["error", {count: 2}],
      "import/no-relative-packages": "error",
      "import/no-unresolved": "error",
      "object-curly-spacing": ["error", "never"],
      "no-restricted-imports": ["error", {patterns: ["spinach-nft-*"]}],
      "padding-line-between-statements": [
        "error",
        {blankLine: "always", prev: "*", next: "cjs-export"},
        {blankLine: "always", prev: "*", next: "export"},
        {blankLine: "always", prev: "const", next: "cjs-export"},
        {blankLine: "always", prev: "*", next: "export"},
      ],
      semi: ["error", "always"],
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
        },
      ],
      "space-in-parens": ["error", "never"],
      "react/prop-types": "off",
      "react/jsx-tag-spacing": ["error", {beforeSelfClosing: "never"}],
      "react-hooks/exhaustive-deps": "off",
    },
    settings: {
      react: {version: "detect"},
      tailwindcss: {classRegex: "^class(.*)?$"},
    },
  },
]);
