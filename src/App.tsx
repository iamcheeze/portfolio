import { useCallback, useEffect, useRef, useState } from 'react'
import { CatalogPage } from './CatalogPage'
import { HomeScrollPage, type HomeScrollControls } from './HomeScrollPage'
import { HomeTrackCard } from './HomeTrackCard'
import { NavButton } from './NavButton'
import { SceneBackground } from './SceneBackground'
import { TaglineMarquee } from './TaglineMarquee'
import { scrollingTrackProjectItems } from './projectItems'
import instagramIcon from './assets/instagramIcon.svg'
import youtubeIcon from './assets/youtube.svg'
import itchIcon from './assets/itchIcon.svg'
import linkedinIcon from './assets/linkedinIcon.svg'
import './App.css'

type Page = 'home' | 'experience' | 'catalog' | 'about' | 'contact'
type ScrollSection = 'home' | 'about' | 'experience' | 'contact'

const TRANSITION_MS = 420

const socialLinks = [
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@iamcheezeYT',
    icon: youtubeIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/iamrayanghosh/',
    icon: instagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rayan-ghosh-830a04386/',
    icon: linkedinIcon,
  },
  {
    label: 'Itch',
    href: 'https://iamcheeze.itch.io/',
    icon: itchIcon,
  },
]

/** * Detection logic: GitHub Pages friendly hash check 
 */
function getPageFromPath(): Page {
  const hash = window.location.hash

  switch (hash) {
    case '#/catalog':
      return 'catalog'
    case '#/experience':
      return 'experience'
    case '#/about':
      return 'about'
    case '#/contact':
      return 'contact'
    default:
      return 'home'
  }
}

function sectionToHash(section: ScrollSection): string {
  switch (section) {
    case 'about': return '#/about'
    case 'experience': return '#/experience'
    case 'contact': return '#/contact'
    default: return '#/'
  }
}

const SCROLL_SECTIONS: ScrollSection[] = ['home', 'about', 'experience', 'contact']

function isScrollSection(page: Page): page is ScrollSection {
  return SCROLL_SECTIONS.includes(page as ScrollSection)
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const homeScrollRef = useRef<HomeScrollControls>(null)
  const [page, setPage] = useState<Page>(() => getPageFromPath())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const homeTrackItems = [...scrollingTrackProjectItems, ...scrollingTrackProjectItems]

  const onSectionChange = useCallback((section: ScrollSection) => {
    const nextHash = sectionToHash(section)
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
    setPage(section)
  }, [])

  const transitionTo = useCallback((nextPage: Page, pushHistory = true) => {
    if (nextPage === page || isTransitioning) return

    // If scrolling to a section within the home scroll, just scroll there
    if (isScrollSection(nextPage) && isScrollSection(page)) {
      homeScrollRef.current?.scrollToSection(nextPage)
      return
    }

    setIsTransitioning(true)

    window.setTimeout(() => {
      setPage(nextPage)

      if (pushHistory) {
        const nextHash =
          nextPage === 'catalog'
            ? '#/catalog'
            : nextPage === 'experience'
              ? '#/experience'
              : nextPage === 'about'
                ? '#/about'
                : nextPage === 'contact'
                  ? '#/contact'
                  : '#/'
        window.location.hash = nextHash
      }

      window.setTimeout(() => {
        setIsTransitioning(false)
      }, 60)
    }, TRANSITION_MS)
  }, [isTransitioning, page])

  useEffect(() => {
    const root = appRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let targetX = 0
    let targetY = 0
    let smoothX = 0
    let smoothY = 0
    let raf = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: PointerEvent) => {
      if (reduceMotion.matches) return
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    if (!reduceMotion.matches) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
    }

    const tick = () => {
      const follow = reduceMotion.matches ? 1 : 0.09
      smoothX = lerp(smoothX, targetX, follow)
      smoothY = lerp(smoothY, targetY, follow)
      root.style.setProperty('--px', smoothX.toFixed(5))
      root.style.setProperty('--py', smoothY.toFixed(5))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  /**
   * Listen for browser back/forward buttons using hashchange
   */
  useEffect(() => {
    const onHashChange = () => {
      const next = getPageFromPath()

      if (isScrollSection(next)) {
        homeScrollRef.current?.scrollToSection(next, 'auto')
        setPage(next)
        return
      }

      transitionTo(next, false)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [transitionTo])

  return (
    <div className="app" ref={appRef}>
      <SceneBackground />
      <div className="hero-backdrop" aria-hidden="true" />

      <div className={`page-transition ${isTransitioning ? 'is-leaving' : 'is-entering'}`}>
        {isScrollSection(page) ? (
          <HomeScrollPage
            ref={homeScrollRef}
            startAt={page}
            onSectionChange={onSectionChange}
            onCatalog={() => transitionTo('catalog')}
            hero={
              <main className="hero">
                <div className="hero-marquee hero-marquee--top" aria-label="Featured projects, scrolling top row">
                  <div className="hero-track hero-track--rtl">
                    {homeTrackItems.map((item, index) => {
                      const isDuplicate = index >= scrollingTrackProjectItems.length

                      return (
                        <HomeTrackCard
                          key={`top-${item.title}-${index}`}
                          href={item.href}
                          image={item.image}
                          title={item.title}
                          ariaHidden={isDuplicate}
                          tabIndex={isDuplicate ? -1 : 0}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="hero-core">
                  <div className="hero-glow" aria-hidden="true" />

                  <div className="hero-dismiss-group">
                    <header className="hero-copy">
                      <h1 className="hero-title fade-in-header hero-scroll-part hero-scroll-part--title">
                        RAYAN GHOSH
                      </h1>
                      <div className="fade-in-tagline hero-scroll-part hero-scroll-part--tagline">
                        <TaglineMarquee />
                      </div>
                    </header>

                    <nav
                      className="nav-panel fade-in-nav hero-scroll-part hero-scroll-part--nav"
                      aria-label="Main"
                    >
                      <NavButton
                        onClick={() => homeScrollRef.current?.scrollToSection('experience')}
                        href="#/experience"
                      >
                        EXPERIENCE
                      </NavButton>
                      <NavButton
                        onClick={() => homeScrollRef.current?.scrollToSection('about')}
                        href="#/about"
                      >
                        WHO AM I?
                      </NavButton>
                      <NavButton
                        onClick={() => homeScrollRef.current?.scrollToSection('contact')}
                        href="#/contact"
                      >
                        CONTACT
                      </NavButton>
                    </nav>

                    <nav
                      className="social-panel fade-in-social hero-scroll-part hero-scroll-part--social"
                      aria-label="Social media"
                    >
                      {socialLinks.map((item) => (
                        <a
                          className="social-btn"
                          href={item.href}
                          key={item.label}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                        >
                          <img src={item.icon} alt="" />
                        </a>
                      ))}
                    </nav>
                  </div>

                  <button
                    type="button"
                    className="hero-scroll-hint fade-in-social"
                    onClick={() => homeScrollRef.current?.scrollToSection('about')}
                    aria-label="Scroll down to Who Am I section"
                  >
                    <span>(scroll down!)</span>
                    <svg
                      className="hero-scroll-hint-arrow"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="hero-marquee hero-marquee--bottom" aria-label="Featured projects, scrolling bottom row">
                  <div className="hero-track hero-track--ltr">
                    {homeTrackItems.map((item, index) => {
                      const isDuplicate = index >= scrollingTrackProjectItems.length

                      return (
                        <HomeTrackCard
                          key={`bottom-${item.title}-${index}`}
                          href={item.href}
                          image={item.image}
                          title={item.title}
                          ariaHidden={isDuplicate}
                          tabIndex={isDuplicate ? -1 : 0}
                        />
                      )
                    })}
                  </div>
                </div>
              </main>
            }
          />
        ) : (
          <CatalogPage onBack={() => transitionTo('experience')} />
        )}
      </div>
    </div>
  )
}

export default App
