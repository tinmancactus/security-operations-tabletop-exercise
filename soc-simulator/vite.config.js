import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Get scenario from environment variable, default to operation-glasshouse/session-1
const scenario = process.env.SCENARIO || 'operation-glasshouse/session-1'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  
  return {
    plugins: [
      vue(),
      // Only use singlefile plugin for production builds
      ...(isBuild ? [viteSingleFile()] : [])
    ],
    define: {
      // Make scenario path available at build time
      '__SCENARIO_PATH__': JSON.stringify(scenario)
    },
    build: {
      // Inline all assets as base64 (no size limit)
      assetsInlineLimit: Infinity,
      // Output filename based on scenario
      rollupOptions: {
        output: {
          // Clean scenario name for filename (replace / with -)
          entryFileNames: `soc-sim-${scenario.replace(/\//g, '-')}.js`
        }
      }
    }
  }
})
