import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "better-tailwindcss": betterTailwindcss,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
    },
    rules: {
      // Stylistic rules (as errors)
      // Disabled: uses template literals, not clsx() for line wrapping
      "better-tailwindcss/enforce-consistent-class-order": "error",
      "better-tailwindcss/enforce-consistent-variable-syntax": "error",
      "better-tailwindcss/enforce-consistent-important-position": "error",
      "better-tailwindcss/enforce-shorthand-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      // Correctness rules (as errors)
      "better-tailwindcss/no-unregistered-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: false,
          rootDir: "src",
          prefix: "@",
        },
      ],
    },
  },
  prettierConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
