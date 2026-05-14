import { useEffect, useRef } from 'react'
import { SceneBackground } from './SceneBackground'
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
      <main className="ui-shell">
        <div className="ui-card">
          <p className="eyebrow">React · Vite · Three.js</p>
          <h1>Your site</h1>
          <p className="lede">
            Standard foreground UI with a WebGL scene behind it. Edit{' '}
            <code>src/App.tsx</code> and <code>src/SceneBackground.tsx</code> to
            extend the layout and 3D content.
          </p>
          <div className="ui-actions">
            <button type="button" className="btn btn-primary">
              Primary action
            </button>
            <button type="button" className="btn btn-ghost">
              Secondary
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
