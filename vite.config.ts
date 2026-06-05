import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'serve-data-4-website',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && (req.url.startsWith('/Data4Website/') || req.url.startsWith('/Data4Website'))) {
              const urlPath = req.url.split('?')[0];
              const decodedUrl = decodeURIComponent(urlPath);
              const filePath = path.join(process.cwd(), decodedUrl);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                let contentType = 'application/octet-stream';
                if (ext === '.png') contentType = 'image/png';
                else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
                else if (ext === '.svg') contentType = 'image/svg+xml';
                else if (ext === '.webp') contentType = 'image/webp';
                res.setHeader('Content-Type', contentType);
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
            next();
          });
        }
      },
      {
        name: 'copy-data-4-website',
        closeBundle() {
          const srcDir = path.join(process.cwd(), 'Data4Website');
          const destDir = path.join(process.cwd(), 'dist/Data4Website');
          
          const copyRecursive = (src: string, dest: string) => {
            if (!fs.existsSync(src)) return;
            if (fs.statSync(src).isDirectory()) {
              if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true });
              }
              fs.readdirSync(src).forEach(child => {
                copyRecursive(path.join(src, child), path.join(dest, child));
              });
            } else {
              if (!fs.existsSync(path.dirname(dest))) {
                fs.mkdirSync(path.dirname(dest), { recursive: true });
              }
              fs.copyFileSync(src, dest);
            }
          };
          copyRecursive(srcDir, destDir);
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
