import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react'
import { CatalogPage } from './CatalogPage'
import { BackstoryPage } from './Backstory'
import { AcuteRespiratoryDistressPage } from './AcuteRespiratoryDistressPage'
import { CitrusBeatdownPage } from './CitrusBeatdownPage'
import { DifficultConversationSimulatorPage } from './DifficultConversationSimulatorPage'
import { LumbarPunctureVirtualTrainerPage } from './LumbarPunctureVirtualTrainerPage'
import { MindlockMuseumPage } from './MindlockMuseumPage'
import { PaintTheWorldRedPage } from './PaintTheWorldRedPage'
import type { HighlightPageProps } from './highlightPageTypes'
import { SiteFooter } from './SiteFooter'
import { HomeScrollPage, type HomeScrollControls } from './HomeScrollPage'
import { isHighlightId, type HighlightId } from './highlightsData'
import {
  getPageFromPath,
  isScrollSection,
  migrateLegacyHashRoute,
  migrateLegacyPathRoute,
  pageToPath,
  sectionToPath,
  type Page,
  type ScrollSection,
} from './routes'
import { HeroMiniScrollingTrack } from './HeroMiniScrollingTrack'
import { HomeTrackCard } from './HomeTrackCard'
import { NavButton } from './NavButton'
import { SceneBackground } from './SceneBackground'
import { TaglineMarquee } from './TaglineMarquee'
import { scrollingTrackProjectItems, type ProjectItem } from './projectItems'
import instagramIcon from './assets/instagramIcon.svg'
import youtubeIcon from './assets/youtube.svg'
import itchIcon from './assets/itchIcon.svg'
import linkedinIcon from './assets/linkedinIcon.svg'
import { routePath } from './routes'
import './App.css'

const TRANSITION_MS = 420

const highlightPages: Record<HighlightId, ComponentType<HighlightPageProps>> = {
  ards: AcuteRespiratoryDistressPage,
  'lumbar-puncture': LumbarPunctureVirtualTrainerPage,
  'difficult-conversation': DifficultConversationSimulatorPage,
  mindlock: MindlockMuseumPage,
  'citrus-beatdown': CitrusBeatdownPage,
  'paint-the-world-red': PaintTheWorldRedPage,
}

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
  {
    label: '(CV)',
    href: 'https://drive.google.com/file/d/1XjYry0P2eFwgLl42o_59LYiaFuc3QeTJ/view',
  },
]

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function buildMarqueeTrack(items: ProjectItem[]) {
  const shuffled = shuffleItems(items)
  return { track: [...shuffled, ...shuffled], uniqueCount: shuffled.length }
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const homeScrollRef = useRef<HomeScrollControls>(null)
  const [page, setPage] = useState<Page>(() => {
    migrateLegacyHashRoute()
    migrateLegacyPathRoute()
    return getPageFromPath()
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const homeTopMarquee = useMemo(() => buildMarqueeTrack(scrollingTrackProjectItems), [])
  const homeBottomMarquee = useMemo(() => buildMarqueeTrack(scrollingTrackProjectItems), [])

  const onSectionChange = useCallback((section: ScrollSection) => {
    const nextPath = sectionToPath(section)
    if (window.location.pathname !== nextPath) {
      window.history.replaceState(null, '', nextPath)
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
        const nextPath = pageToPath(nextPage)
        window.history.pushState(null, '', nextPath)
      }

      window.setTimeout(() => {
        setIsTransitioning(false)
      }, 60)
    }, TRANSITION_MS)
  }, [isTransitioning, page])

  const openCatalog = useCallback(() => {
    window.scrollTo(0, 0)
    const catalogPath = pageToPath('catalog')
    if (window.location.pathname !== catalogPath) {
      window.history.pushState(null, '', catalogPath)
    }
    setIsTransitioning(false)
    setPage('catalog')
  }, [])

  useLayoutEffect(() => {
    if (!isScrollSection(page)) {
      window.scrollTo(0, 0)
    }
  }, [page])

  const openBackstory = useCallback(() => {
    const backstoryPath = pageToPath('backstory')
    if (window.location.pathname !== backstoryPath) {
      window.history.pushState(null, '', backstoryPath)
    }
    setIsTransitioning(false)
    setPage('backstory')
  }, [])

  const openHighlight = useCallback((id: HighlightId) => {
    const highlightPath = pageToPath(id)
    if (window.location.pathname !== highlightPath) {
      window.history.pushState(null, '', highlightPath)
    }
    setIsTransitioning(false)
    setPage(id)
  }, [])

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
   * Listen for browser back/forward and manual URL edits.
   */
  useEffect(() => {
    const onLocationChange = () => {
      migrateLegacyHashRoute()
      migrateLegacyPathRoute()
      const next = getPageFromPath()

      if (next === 'catalog') {
        setIsTransitioning(false)
        setPage('catalog')
        return
      }

      if (next === 'backstory') {
        setIsTransitioning(false)
        setPage('backstory')
        return
      }

      if (isHighlightId(next)) {
        setIsTransitioning(false)
        setPage(next)
        return
      }

      if (isScrollSection(next)) {
        homeScrollRef.current?.scrollToSection(next, 'auto')
        setPage(next)
        return
      }

      transitionTo(next, false)
    }

    window.addEventListener('popstate', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
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
            onCatalog={openCatalog}
            onBackstory={openBackstory}
            onHighlight={openHighlight}
            hero={
              <main className="hero">
                <div className="hero-marquee hero-marquee--top" aria-label="Featured projects, scrolling top row">
                  <div className="hero-track hero-track--rtl">
                    {homeTopMarquee.track.map((item, index) => {
                      const isDuplicate = index >= homeTopMarquee.uniqueCount

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

                <HeroMiniScrollingTrack
                  className="hero-mini-marquee--top"
                  track={homeTopMarquee.track}
                  uniqueCount={homeTopMarquee.uniqueCount}
                />

                <div className="hero-core">
                  <div className="hero-glow" aria-hidden="true" />

                  <div className="hero-dismiss-layout">
                    <button
                      type="button"
                      className="hero-scroll-hint hero-scroll-hint--desktop hero-scroll-hint--desktop-left fade-in-social"
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
                        href={routePath('/experience')}
                      >
                        EXPERIENCE
                      </NavButton>
                      <NavButton
                        onClick={() => homeScrollRef.current?.scrollToSection('about')}
                        href={routePath('/about')}
                      >
                        WHO AM I?
                      </NavButton>
                      <NavButton onClick={openCatalog} href={routePath('/catalog')}>
                        CATALOG
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
                          {item.icon ? (
                            <img src={item.icon} alt="" />
                          ) : (
                            <span
                              className={`social-btn-label ${item.label === '(CV)' ? 'social-btn-label--bold' : ''}`}
                            >
                              {item.label}
                            </span>
                          )}
                        </a>
                      ))}
                    </nav>
                    </div>

                    <button
                      type="button"
                      className="hero-scroll-hint hero-scroll-hint--desktop hero-scroll-hint--desktop-right fade-in-social"
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

                <HeroMiniScrollingTrack
                  className="hero-mini-marquee--bottom"
                  track={homeBottomMarquee.track}
                  uniqueCount={homeBottomMarquee.uniqueCount}
                  direction="ltr"
                />

                <div className="hero-marquee hero-marquee--bottom" aria-label="Featured projects, scrolling bottom row">
                  <div className="hero-track hero-track--ltr">
                    {homeBottomMarquee.track.map((item, index) => {
                      const isDuplicate = index >= homeBottomMarquee.uniqueCount

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
        ) : page === 'catalog' ? (
          <>
            <CatalogPage
              onHome={() => transitionTo('home')}
              onExperience={() => transitionTo('experience')}
              onAbout={() => transitionTo('about')}
            />
            <SiteFooter />
          </>
        ) : page === 'backstory' ? (
          <>
            <BackstoryPage
              onBack={() => transitionTo('about')}
              onHome={() => transitionTo('home')}
              onExperience={() => transitionTo('experience')}
              onAbout={() => transitionTo('about')}
              onCatalog={openCatalog}
            />
            <SiteFooter />
          </>
        ) : isHighlightId(page) ? (
          <>
            {(() => {
              const HighlightPage = highlightPages[page]
              return (
                <HighlightPage
                  onBack={() => transitionTo('experience')}
                  onHome={() => transitionTo('home')}
                  onExperience={() => transitionTo('experience')}
                  onAbout={() => transitionTo('about')}
                  onCatalog={openCatalog}
                />
              )
            })()}
            <SiteFooter />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default App
