import { useEffect, useRef } from 'react'
import { NavButton } from './NavButton'
import { SceneBackground } from './SceneBackground'
import { TaglineMarquee } from './TaglineMarquee'
import './App.css'

function App() {
  const appRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="app" ref={appRef}>
      <SceneBackground />
      <div className="hero-backdrop" aria-hidden="true" />

      <main className="hero">
        <div className="hero-glow" aria-hidden="true" />

        <header className="hero-copy">
          <h1 className="hero-title">RAYAN GHOSH</h1>
          <TaglineMarquee />
        </header>
        <nav className="nav-panel" aria-label="Main">
          <NavButton href="#projects">WORK</NavButton>
          <NavButton href="#about">WHO AM I?</NavButton>
          <NavButton href="#contact">CONTACT</NavButton>
        </nav>
      </main>
    </div>
  )
}

export default App
