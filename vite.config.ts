import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all"), tsconfigPaths()],
  // WSL上のコンテナで起動するとViteのHMRが効かない問題があるためこれで回避する
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
