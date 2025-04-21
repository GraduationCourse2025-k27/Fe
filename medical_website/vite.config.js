import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  clearScreen: false,
  server: {
    watch: {
      ignored: [
        '**/README.md',
        '**/eslint.config.js',
        '**/.git/**',
        '**/node_modules/**',
      ],
    },
  },
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  },
});
