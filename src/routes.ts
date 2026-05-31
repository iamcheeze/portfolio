import {
  getHighlightById,
  getHighlightFromPath,
  isHighlightId,
  type HighlightId,
} from './highlightsData'

export type Page = 'home' | 'experience' | 'catalog' | 'about' | 'backstory' | HighlightId
export type ScrollSection = 'home' | 'about' | 'experience'

const SCROLL_SECTIONS: ScrollSection[] = ['home', 'about', 'experience']

export function isScrollSection(page: Page): page is ScrollSection {
  return SCROLL_SECTIONS.includes(page as ScrollSection)
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
}

/** Strip Vite base prefix so `/portfolio/catalog` becomes `/catalog`. */
export function getAppPathname(): string {
  const base = import.meta.env.BASE_URL
  let pathname = window.location.pathname

  if (base !== '/') {
    const basePath = base.endsWith('/') ? base.slice(0, -1) : base
    if (pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || '/'
    }
  }

  return normalizePath(pathname)
}

/** Build a browser URL for an app route (respects Vite base). */
export function routePath(path: string): string {
  const normalized = normalizePath(path)
  const base = import.meta.env.BASE_URL

  if (normalized === '/') {
    return base
  }

  return `${base}${normalized.slice(1)}`
}

export function getPageFromPath(): Page {
  const path = getAppPathname()

  switch (path) {
    case '/catalog':
      return 'catalog'
    case '/experience':
      return 'experience'
    case '/about':
      return 'about'
    case '/contact':
      return 'experience'
    case '/journey':
    case '/backstory':
      return 'backstory'
    default: {
      const highlight = getHighlightFromPath(path)
      if (highlight) return highlight.id
      return 'home'
    }
  }
}

export function sectionToPath(section: ScrollSection): string {
  switch (section) {
    case 'about':
      return routePath('/about')
    case 'experience':
      return routePath('/experience')
    default:
      return routePath('/')
  }
}

export function pageToPath(page: Page): string {
  switch (page) {
    case 'catalog':
      return routePath('/catalog')
    case 'experience':
      return routePath('/experience')
    case 'about':
      return routePath('/about')
    case 'backstory':
      return routePath('/journey')
    default: {
      const highlight = isHighlightId(page) ? getHighlightById(page) : undefined
      return highlight ? routePath(highlight.path) : routePath('/')
    }
  }
}

/** Redirect legacy `#/…` bookmarks to clean paths. */
export function migrateLegacyHashRoute(): boolean {
  const { hash } = window.location
  if (!hash.startsWith('#/')) return false

  const legacyPath = normalizePath(hash.slice(1))
  const canonicalPath = legacyPath === '/backstory' ? '/journey' : legacyPath
  window.history.replaceState(null, '', routePath(canonicalPath))
  return true
}

/** Redirect old path URLs (e.g. `/backstory`) to their canonical replacements. */
export function migrateLegacyPathRoute(): boolean {
  if (getAppPathname() !== '/backstory') return false
  window.history.replaceState(null, '', routePath('/journey'))
  return true
}
