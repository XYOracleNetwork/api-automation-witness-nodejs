import {
  typescriptConfig,
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  sonarConfig,
  importConfig,
} from '@xylabs/eslint-config-flat'

export default [
  {
    ignores: [
      '.yarn',
      '**/dist',
      '**/build',
      '**/public',
      '**/storybook-static',
      '**/.storybook',
      'scripts',
      '**/node_modules',
      '.dependency-cruiser.mjs',
      'node_modules',
      'dist',
      'build',
    ],
  },
  unicornConfig,
  workspacesConfig,
  rulesConfig,
  typescriptConfig,
  importConfig,
  sonarConfig,
  {
    rules: {
      'import-x/no-unresolved': ['off'],
      'import-x/no-internal-modules': ['off'],
      'sonarjs/prefer-single-boolean-return': ['off'],
    },
  },
  {
    files: ['**/packages/*/src/**/*.{js,ts,jsx,tsx}'],
    ignores: ['**/*.spec.{js,ts,jsx,tsx}', 'packages/sdk/src/test/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: ['node:*'] }, // Also blocks imports like `node:fs`
      ],
    },
  },
]
