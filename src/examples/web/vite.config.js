import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/react-shadertoy/",
    resolve: {
        dedupe: ["three", "@react-three/fiber", "@react-three/drei"],
    },
    build: {
        outDir: "../../../docs",
        emptyOutDir: true,
        chunkSizeWarningLimit: 2500,
        assetsInlineLimit: 0,
        rollupOptions: {
            external: [],
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react/jsx-runtime"],
                    "three-core": ["three"],
                    "three-libs-1": ["@react-three/fiber", "@react-three/drei"],
                },
            },
        },
    },
});