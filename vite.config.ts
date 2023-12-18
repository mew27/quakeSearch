import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(( { command } ) => {
  if (command === "serve") {
    return {
      plugins: [react()]
    }
  } else if (command === 'build') {
    return {
      plugins: [react()],
      base: "quakeSearch"
    }    
  }
})
