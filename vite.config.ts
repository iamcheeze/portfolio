import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Served at https://rayanghosh.com (GitHub Pages custom domain) from /.
 * Hash routes (#/about, etc.) work without server rewrites.
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

// https://vite.dev/config/
export default defineConfig({
  base: siteBase(),
  plugins: [react()],
})
