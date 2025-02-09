import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import * as path from 'path';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        wasm(), // Enables WebAssembly support
    ],
    build: {
        sourcemap: false,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // Make sure Vite can resolve the WebAssembly correctly
            'tiktoken/wasm': path.resolve(
                __dirname,
                'node_modules/tiktoken/tiktoken_bg.wasm'
            ),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    test: {
        css: false,
        include: ['src/**/__tests__/*'],
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests.ts',
        clearMocks: true,
    },
});
