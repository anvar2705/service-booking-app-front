import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@app", replacement: resolve(process.cwd(), "./src/1-app") },
            { find: "@pages", replacement: resolve(process.cwd(), "./src/2-pages") },
            {
                find: "@widgets",
                replacement: resolve(process.cwd(), "./src/3-widgets"),
            },
            {
                find: "@features",
                replacement: resolve(process.cwd(), "./src/4-features"),
            },
            {
                find: "@entities",
                replacement: resolve(process.cwd(), "./src/5-entities"),
            },
            {
                find: "@shared",
                replacement: resolve(process.cwd(), "./src/6-shared"),
            },
        ],
    },
});
