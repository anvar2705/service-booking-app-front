import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig((configEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd(), "");

    const PROXY_CONFIG = {
        target: env.API_SERVER_URL,
        changeOrigin: true,
    };

    return {
        plugins: [TanStackRouterVite({ target: "react", autoCodeSplitting: true }), react()],
        server: {
            port: Number(env.DEV_SERVER_PORT),
            proxy: {
                "/api": PROXY_CONFIG,
            },
        },
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
    };
});
