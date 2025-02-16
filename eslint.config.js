// eslint.config.js

import eslint from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default tseslint
    .config(
        { ignores: ['dist', 'node_modules'] },
        {
            extends: [
                eslint.configs.recommended,
                ...tseslint.configs.recommendedTypeChecked,
            ],
            files: ['src/**/*.{ts,tsx}'],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                    sourceType: 'module',
                    project: './tsconfig.json',
                    // tsconfigRootDir: __dirname,
                },
            },
            plugins: {
                'react-hooks': reactHooks,
                'react-refresh': reactRefresh,
                tailwindcss: tailwindcss,
                react: react,
            },
            rules: {
                ...reactHooks.configs.recommended.rules,
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                ...tseslint.configs.recommended.rules,
                'no-useless-catch': 'off',
                'no-param-reassign': [1],
                'tailwindcss/no-custom-classname': [
                    2,
                    {
                        whitelist: [
                            '((bg|text|border|ring|m|m[x,y,t,b,l,r]|p|p[x,y,t,b,l,r]|gap)\\-).*',
                            'animate-show',
                        ],
                    },
                ],
                'react/jsx-uses-react': 'error',
                'react/jsx-uses-vars': 'error',
                'tailwindcss/classnames-order': [0, {}],
            },
        }
    )
    .concat(eslintPluginPrettier);
