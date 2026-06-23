import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['node_modules', 'playwright-report', 'test-results', 'dist'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['tests/**', '**/*.spec.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    rules: {
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
  prettier,
);
