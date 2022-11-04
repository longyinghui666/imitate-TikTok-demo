import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';

// eslint-disable-next-line no-undef
const tempname = process.env.TEMPAPPNAME;
export default defineConfig(() => {
  let appPath = tempname ? `src/templates/${tempname}` : '.';
  return {
    root: resolve(`${appPath}`),
    base: tempname ? `/${tempname}` : '/',
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve('src')
        },
        {
          find: 'templates',
          replacement: resolve('src/templates')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          additionalData: '@import "@/assets/scss/global.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'

          // 如果引入多个文件，可以使用
          // additionalData: '@import "@/assets/scss/globalVariable1.scss"; @import "@/assets/scss/globalVariable2.scss";'
        }
      }
    },
    build: {
      rollupOptions: {
        input: resolve(`${appPath}/index.html`)
      },
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      }
    }

    // 跨域
    // server: {
    //   //使用IP能访问
    //   host: '0.0.0.0',
    //   // 热更新
    //   hmr: true,
    //   //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    //   strictPort: false,
    //   //自定义代理规则
    //   proxy: {
    //     // 选项写法
    //     '/api': {
    //       target: 'https://admin.itrustnow.com',
    //       // target: "http://192.168.0.50:8083",
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/api/, '')
    //     }
    //   }
    // }
  };
});
