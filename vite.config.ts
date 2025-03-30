import path from "path"
import dts from 'vite-plugin-dts'
import react from "@vitejs/plugin-react-swc"
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

import { defineConfig } from 'vite'

import { cpSync, mkdirSync } from 'fs';

function copyAssets() {
    return {
        name: 'copy-assets',
        writeBundle() {
            // Ensure the assets directory exists
            mkdirSync('./dist/assets', { recursive: true });

            // Copy SVGs from src/assets to dist/assets
            cpSync('./src/assets', './dist/assets', {
                recursive: true,
                filter: (src) => src.endsWith('.svg')
            });
        }
    };
}

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
        react(),
        tailwindcss(),
        glsl(),
        copyAssets(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            tsconfig: './tsconfig.app.json'
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: './dist',
        chunkSizeWarningLimit: 2500,
        assetsInlineLimit: 0,
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name: '@kortexa-ai/ui',
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'firebase/auth',
                'three',
                '@react-three/fiber',
                '@react-three/drei',
                '@react-three/rapier',
                '@react-three/xr',
                '@kortexa-ai/core',
            ],
            output: {
                assetFileNames: (assetInfo) => {
                    const svg = assetInfo.names.some((name) => name.endsWith('.svg'));
                    if (svg) {
                        return `assets/[name][extname]`;
                    }
                    return '[name][extname]';
                },
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    '@kortexa-ai/core': 'KortexaCore',
                },
            },
        },
    },
})