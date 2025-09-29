import eslintPluginImport from 'eslint-plugin-import';
import typescriptEslint from 'typescript-eslint';
import fs from 'fs';

const eslintIgnore = [
  '.git/',
  '.turbo/',
  'node_modules/',
  'dist/',
  'build/',
  'coverage/',
  '*.min.js',
  '*.config.js',
  '*.d.ts',
];

const config = typescriptEslint.config(
  {
    ignores: eslintIgnore,
  },
  typescriptEslint.configs.recommended,
  eslintPluginImport.flatConfigs.recommended,
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
          pathGroups: [
            ...getDirectoriesToSort().map((singleDir) => ({
              pattern: `${singleDir}/**`,
              group: 'internal',
            })),
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
);

function getDirectoriesToSort() {
  const ignoredSortingDirectories = ['.git', 'node_modules'];
  return fs
    .readdirSync(process.cwd())
    .filter((file) => fs.statSync(process.cwd() + '/' + file).isDirectory())
    .filter((f) => !ignoredSortingDirectories.includes(f));
}

export default config;
