import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React core packages (must match /package-name/ to avoid catching react-router, etc.)
            if (id.includes('/react/') || id.includes('/scheduler/') || id.includes('/react-dom/')) {
              return 'react-vendor';
            }
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'router-vendor';
            }
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'charts-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
