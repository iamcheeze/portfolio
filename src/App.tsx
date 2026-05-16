import { useCallback, useEffect, useRef, useState } from 'react'
import { ExperiencePage } from './ExperiencePage'
import { NavButton } from './NavButton'
import { SceneBackground } from './SceneBackground'
import { TaglineMarquee } from './TaglineMarquee'
import './App.css'

type Page = 'home' | 'experience'

const TRANSITION_MS = 420

/** * Detection logic: GitHub Pages friendly hash check 
 */
function getPageFromPath(): Page {
  const hash = window.location.hash
  return hash === '#/experience' ? 'experience' : 'home'
}

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<Page>(() => getPageFromPath())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transitionTo = useCallback((nextPage: Page, pushHistory = true) => {
    if (nextPage === page || isTransitioning) return

    setIsTransitioning(true)

    window.setTimeout(() => {
      setPage(nextPage)
      
      if (pushHistory) {
        // Set hash instead of pushState to prevent 404s on refresh
        const nextHash = nextPage === 'experience' ? '#/experience' : '#/'
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
      transitionTo(getPageFromPath(), false)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [transitionTo])

  return (
    <div className="app" ref={appRef}>
      <SceneBackground />
      <div className="hero-backdrop" aria-hidden="true" />

      <div className={`page-transition ${isTransitioning ? 'is-leaving' : 'is-entering'}`}>
        {page === 'home' ? (
          <main className="hero">
            <div className="hero-glow" aria-hidden="true" />

            <header className="hero-copy">
              <h1 className="hero-title fade-in-header">RAYAN GHOSH</h1>
              <div className="fade-in-tagline">
                <TaglineMarquee />
              </div>
            </header>

            <nav className="nav-panel fade-in-nav" aria-label="Main">
              {/* Added fallback href for SEO and middle-click support */}
              <NavButton 
                onClick={() => transitionTo('experience')} 
                href="#/experience"
              >
                EXPERIENCE
              </NavButton>
              <NavButton href="#about">WHO AM I?</NavButton>
              <NavButton href="#contact">CONTACT</NavButton>
            </nav>
          </main>
        ) : (
          <ExperiencePage onBack={() => transitionTo('home')} />
        )}
      </div>
    </div>
  )
}

export default App