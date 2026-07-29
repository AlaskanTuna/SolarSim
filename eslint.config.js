const js = require('@eslint/js')
const prettier = require('eslint-config-prettier')
const reactHooks = require('eslint-plugin-react-hooks')
const tseslint = require('typescript-eslint')
const globals = require('globals')

const typescriptFiles = [
  'shared/**/*.{ts,tsx}',
  'backend/**/*.{ts,tsx}',
  'frontend/**/*.{ts,tsx}',
  'services/pdf-service/**/*.{ts,tsx}'
]

const isOff = (setting) => setting === 'off' || setting === 0 || (Array.isArray(setting) && isOff(setting[0]))

const warnings = (rules) =>
  Object.fromEntries(
    Object.entries(rules)
      .filter(([, setting]) => !isOff(setting))
      .map(([name, setting]) => [name, Array.isArray(setting) ? ['warn', ...setting.slice(1)] : 'warn'])
  )

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/generated/**',
      '**/prisma/generated/**',
      '**/*.d.ts',
      'graphify-out/**',
      'docs/**',
      'tests/**',
      '.*/**',
      'backend/src/**/*.js',
      'frontend/src/**/*.js',
      'shared/*.js',
      'prisma/seed.js'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.node
    },
    rules: {
      ...warnings(js.configs.recommended.rules),
      'no-debugger': 'error'
    }
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: typescriptFiles
  })),
  {
    files: typescriptFiles,
    rules: {
      ...warnings(Object.assign({}, ...tseslint.configs.recommended.map((config) => config.rules || {}))),
      'no-debugger': 'error',
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
    rules: {
      ...warnings(reactHooks.configs.flat.recommended.rules),
      'react-hooks/rules-of-hooks': 'error'
    }
  },
  prettier
]
