import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages: project sites are served from /repo-name/.
 * User/org sites use a repo named <user>.github.io and are served from /.
 * @see https://vitejs.dev/guide/static-deploy.html#github-pages
 */
function githubPagesBase(): string {
  const full = process.env.GITHUB_REPOSITORY
  if (!full) return '/'
  const repo = full.split('/')[1]
  if (!repo) return '/'
  if (repo.endsWith('.github.io')) return '/'
  return `/${repo}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: githubPagesBase(),
  plugins: [react()],
})
