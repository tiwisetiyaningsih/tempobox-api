import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['tempobox.up.railway.app'], 
  },
  build: { outDir: "dist" },
  server: { 
    historyApiFallback: true,
    allowedHosts: ['tempobox.up.railway.app'],
  }
});
