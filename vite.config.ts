import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

// https://vitejs.dev/config/
export default defineConfig(({ mode}) => {
  if (mode === 'bubble') {
    return {
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
      },
      define: {
        'process.env': process.env
      }
    };
  }
  return {
    plugins: [
      react(),
      libInjectCss(),
      dts({ include: ['lib'] }),
    ],
    build: {
      copyPublicDir: false,
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('lib/**/*.{ts,tsx}', { ignore: 'lib/**/*.stories.tsx'}).map(file => [
            relative(
              'lib',
              file.slice(0, file.length - extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
        ),
        output: {
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        },
      },
    },
    define: {
      'process.env': process.env
    }
  };
});
