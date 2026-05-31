import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Served at https://rayanghosh.com (GitHub Pages custom domain) from /.
 * Clean path routes (/catalog, /about, etc.) use the History API.
 *
 * Override with VITE_BASE (e.g. /portfolio/) only if you need the project-site URL.
 */
function siteBase(): string {
  const configured = process.env.VITE_BASE?.trim()
  if (configured) {
    if (configured === '/') return '/'
    return configured.endsWith('/') ? configured : `${configured}/`
  }

  return '/'
}

/** GitHub Pages serves 404.html for unknown paths — copy the SPA shell so deep links work. */
function spaFallback404(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const distDir = join(__dirname, 'dist')
      copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: siteBase(),
  plugins: [react(), spaFallback404()],
})
