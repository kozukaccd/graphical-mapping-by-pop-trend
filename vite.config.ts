import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // WSL上のコンテナで起動するとViteのHMRが効かない問題があるためこれで回避する
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
