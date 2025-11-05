import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  vite: {
    server: {
      fs: { allow: ['.'] }
    }
  }
});
