import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const date = new Date();
    let currentDay = String(date.getDate());
    let currentMonth = String(date.getMonth() + 1);
    let currentYear = date.getFullYear();
    // we will display the date as DD-MM-YYYY
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    return {
        plugins: [
            react(),
            compression({
                algorithm: "gzip",
                exclude: [/\.(br)$ /, /\.(gz)$/],
            }),
            compression({
                algorithm: "brotliCompress",
                exclude: [/\.(br)$ /, /\.(gz)$/],
            }),
        ],
        build: {
            chunkSizeWarningLimit: 50000,
        },
        worker: {
            format: "es",
        },
        resolve: {
            alias: {
                "node-fetch": "isomorphic-fetch",
            },
        },
        define: {
            BUILD_TIMESTAMP: JSON.stringify(currentDate),
        },
    };
});
