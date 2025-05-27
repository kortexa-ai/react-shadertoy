import path from "path"
import dts from 'vite-plugin-dts'
import react from "@vitejs/plugin-react-swc"
import glsl from 'vite-plugin-glsl'

import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
        react(),
        glsl(),
    ],
    optimizeDeps: {
        esbuildOptions: {
            tsconfig: "./tsconfig.app.json",
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "./dist",
        chunkSizeWarningLimit: 2500,
        assetsInlineLimit: 0,
        lib: {
            entry: path.resolve(__dirname, "./src/index.ts"),
            name: "@kortexa-ai/react-shadertoy",
            formats: ["es"],
        },
        rollupOptions: {
            external: [
                "react",
                "react-dom",
                "react/jsx-runtime",
                "three",
                "@react-three/fiber",
                "@react-three/drei",
            ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "jsxRuntime",
                    three: "three",
                    "@react-three/fiber": "@react-three/fiber",
                    "@react-three/drei": "@react-three/drei",
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
});