// eslint.config.js

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint
    .config(
        { ignores: ['dist', 'node_modules'] },
        {
            extends: [js.configs.recommended, ...tseslint.configs.recommended],
            files: ['src/**/*.{ts,tsx}'],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            plugins: {
                'react-hooks': reactHooks,
                'react-refresh': reactRefresh,
            },
            rules: {
                ...reactHooks.configs.recommended.rules,
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                'no-useless-catch': 'off',
            },
        }
    )
    .concat(eslintPluginPrettier);
