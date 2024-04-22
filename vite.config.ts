import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({command,mode}:any)=> {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASEURL } = env;
  return defineConfig({
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: VITE_APP_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
