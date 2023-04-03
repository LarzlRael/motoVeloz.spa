// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [
    react(),
    sass({
      // Define la ubicación de tus estilos globales.
      // Puedes reemplazar "index.scss" por el nombre de tu archivo.
      prependData: `@import './src/styles/index.scss';`,
    }),
  ],
});
