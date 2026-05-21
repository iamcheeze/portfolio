import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AboutSection } from './AboutPage'

type HomeScrollPageProps = {
  startAtAbout: boolean
  onRevealAbout: () => void
  onRevealHome: () => void
  hero: ReactNode
}

export type HomeScrollControls = {
  scrollToAbout: (behavior?: ScrollBehavior) => void
  scrollToHero: (behavior?: ScrollBehavior) => void
}

/** Fraction of viewport height needed to complete the hero ↔ about crossfade */
const HOME_FADE_DISTANCE_RATIO = 0.4

function getFadeDistance(el: HTMLElement) {
  return el.clientHeight * HOME_FADE_DISTANCE_RATIO
}

const SCROLL_IDLE_MS = 140

function isInteractiveScrollTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return !!target.closest(
    'a, button, .nav-btn, .home-track-card, .social-btn, input, textarea, select, [role="button"]',
  )
}

function getWheelScrollDelta(e: WheelEvent, el: HTMLElement) {
  let delta = e.deltaY

  if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    delta *= 16
  } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    delta *= el.clientHeight
  }

  return delta
}

export const HomeScrollPage = forwardRef<HomeScrollControls, HomeScrollPageProps>(
  function HomeScrollPage({ startAtAbout, onRevealAbout, onRevealHome, hero }, ref) {
    const scrollRef = useRef<HTMLElement>(null)
    const openAtAboutOnMount = useRef(startAtAbout)
    const scrollIntentRef = useRef<'none' | 'to-about' | 'to-home'>('none')
    const [aboutProgress, setAboutProgress] = useState(startAtAbout ? 1 : 0)

    const updateProgressFromScroll = useCallback(() => {
      const el = scrollRef.current
      if (!el) return 0

      const distance = getFadeDistance(el)
      if (distance <= 0) return 0

      const progress = Math.min(1, Math.max(0, el.scrollTop / distance))
      setAboutProgress(progress)
      return progress
    }, [])

    const scrollToAbout = useCallback((behavior: ScrollBehavior = 'smooth') => {
      const el = scrollRef.current
      if (!el) return
      scrollIntentRef.current = 'to-about'
      el.scrollTo({ top: getFadeDistance(el), behavior })
    }, [])

    const scrollToHero = useCallback((behavior: ScrollBehavior = 'smooth') => {
      const el = scrollRef.current
      if (!el) return
      scrollIntentRef.current = 'to-home'
      el.scrollTo({ top: 0, behavior })
    }, [])

    useImperativeHandle(ref, () => ({ scrollToAbout, scrollToHero }), [scrollToAbout, scrollToHero])

    useEffect(() => {
      if (!openAtAboutOnMount.current) return

      const el = scrollRef.current
      if (!el) return

      el.scrollTop = getFadeDistance(el)
      setAboutProgress(1)
    }, [])

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      let scrollIdleTimer = 0

      const endScrollMode = () => {
        el.classList.remove('is-scrolling')
      }

      const beginScrollMode = () => {
        el.classList.add('is-scrolling')
        window.clearTimeout(scrollIdleTimer)
        scrollIdleTimer = window.setTimeout(endScrollMode, SCROLL_IDLE_MS)
      }

      const onWheel = (e: WheelEvent) => {
        if (!(e.target instanceof Node) || !el.contains(e.target)) return

        beginScrollMode()

        // First wheel tick may still hit a button; after that, buttons are non-interactive.
        if (!isInteractiveScrollTarget(e.target)) return

        const max = getFadeDistance(el)
        const next = Math.min(max, Math.max(0, el.scrollTop + getWheelScrollDelta(e, el)))

        if (next !== el.scrollTop) {
          el.scrollTop = next
          e.preventDefault()
        }
      }

      const onScroll = () => {
        beginScrollMode()

        const progress = updateProgressFromScroll()
        const intent = scrollIntentRef.current

        if (intent === 'to-home') {
          if (progress < 0.08) scrollIntentRef.current = 'none'
          return
        }

        if (intent === 'to-about') {
          if (progress > 0.92) scrollIntentRef.current = 'none'
          return
        }

        if (progress > 0.92) {
          onRevealAbout()
        } else if (progress < 0.08) {
          onRevealHome()
        }
      }

      const onTouchMove = () => {
        beginScrollMode()
      }

      el.addEventListener('wheel', onWheel, { passive: false, capture: true })
      el.addEventListener('scroll', onScroll, { passive: true })
      el.addEventListener('touchmove', onTouchMove, { passive: true })
      onScroll()

      return () => {
        window.clearTimeout(scrollIdleTimer)
        el.classList.remove('is-scrolling')
        el.removeEventListener('wheel', onWheel, { capture: true })
        el.removeEventListener('scroll', onScroll)
        el.removeEventListener('touchmove', onTouchMove)
      }
    }, [onRevealAbout, onRevealHome, updateProgressFromScroll])

    const handleBackFromAbout = () => {
      scrollRef.current?.classList.remove('is-scrolling')
      onRevealHome()
      scrollToHero()
    }

    const heroOpacity = 1 - aboutProgress
    const aboutOpacity = aboutProgress

    return (
      <section ref={scrollRef} className="home-scroll" aria-label="Home and about">
        <div className="home-scroll-spacer" aria-hidden="true" />

        <div
          className={`home-layer home-layer--hero${aboutProgress > 0.55 ? ' is-inactive' : ''}`}
          style={{ opacity: heroOpacity }}
          aria-hidden={aboutProgress > 0.92}
        >
          {hero}
        </div>

        <div
          className={`home-layer home-layer--about${aboutProgress < 0.45 ? ' is-inactive' : ''}`}
          style={{ opacity: aboutOpacity }}
          aria-hidden={aboutProgress < 0.08}
        >
          <main className="experience-page home-about-panel">
            <div className="experience-glow" aria-hidden="true" />
            <AboutSection showBack onBack={handleBackFromAbout} />
          </main>
        </div>
      </section>
    )
  },
)
