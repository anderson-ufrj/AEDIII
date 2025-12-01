import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores
    "node_modules/**",
    "coverage/**",
    "*.config.js",
    "*.config.mjs",
  ]),
  // Custom rules
  {
    rules: {
      // Warn on console.log in production code (allow warn/error)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce exhaustive deps for React hooks
      "react-hooks/exhaustive-deps": "warn",
      // Prefer const over let when variable is never reassigned
      "prefer-const": "error",
      // No unused variables (ignore underscore-prefixed)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Warn on explicit any types
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
