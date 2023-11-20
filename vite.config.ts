import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['lib'] }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      name: 'dummy',
      entry: resolve(__dirname, 'lib/components/Dummy/bubble.tsx'),
      formats: ['iife'],
    },
    rollupOptions: {
      // input: Object.fromEntries(
      //   glob.sync('lib/**/*.{ts,tsx}', { ignore: 'lib/**/*.stories.tsx'}).map(file => [
      //     relative(
      //       'lib',
      //       file.slice(0, file.length - extname(file).length),
      //     ),
      //     fileURLToPath(new URL(file, import.meta.url)),
      //   ]),
      // ),
      // output: {
      //   assetFileNames: 'assets/[name][extname]',
      //   entryFileNames: '[name].js',
      // },
    },
  },
});
