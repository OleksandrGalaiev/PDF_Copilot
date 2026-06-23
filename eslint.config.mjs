import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'dist'] },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**', '**/*.spec.ts', 'test-options.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    files: ['tests/**', '**/*.spec.ts', 'test-options.ts'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-networkidle': 'warn',
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-force-option': 'warn',
      'playwright/no-useless-await': 'error',
    },
  },
  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
  // must be last: resets project parser and disables type-aware rules for non-TS files
  {
    files: ['**/*.mjs', '**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
);
