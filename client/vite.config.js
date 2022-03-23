import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  define: {
    "process.env.BASE_URL": JSON.stringify("http://localhost:8000"),
  },
  server: {
    cors: false,
  },
}));
