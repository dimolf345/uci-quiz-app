/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode === "development") {
    return {
      plugins: [react()],
      define: {
        "process.env.BASE_URL": JSON.stringify("http://localhost:8000/api/v1"),
      },
      server: {
        cors: true,
      },
    };
  }
});
