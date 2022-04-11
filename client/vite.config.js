/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      plugins: [react()],
      define: {
        "process.env.API_URL": JSON.stringify("http://localhost:8000/api/v1"),
      },
      base: "http://localhost:8000/",
      server: {
        cors: true,
        port: 7000,
      },
    };
  }
  if (mode === "production")
    return {
      plugins: [react()],
      define: {
        "process.env.API_URL": JSON.stringify(
          "https://uci-quiz-app.herokuapp.com/api/v1"
        ),
      },
    };
});

//https://uci-quiz-app.herokuapp.com/api/v1
