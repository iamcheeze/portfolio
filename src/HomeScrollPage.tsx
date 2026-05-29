import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { AboutSection } from './AboutPage'
import { ExperiencePage } from './ExperiencePage'
import type { HighlightId } from './highlightsData'
import { ScrollNav } from './ScrollNav'
import { SiteFooter } from './SiteFooter'

type Section = 'home' | 'about' | 'experience'

const SECTIONS: Section[] = ['home', 'about', 'experience']

type HomeScrollPageProps = {
  startAt: Section
  onSectionChange: (section: Section) => void
  hero: ReactNode
  onCatalog: () => void
  onBackstory: () => void
  onHighlight: (id: HighlightId) => void
}

export type HomeScrollControls = {
  scrollToSection: (section: Section, behavior?: ScrollBehavior) => void
}

export const HomeScrollPage = forwardRef<HomeScrollControls, HomeScrollPageProps>(
  function HomeScrollPage({ startAt, onSectionChange, hero, onCatalog, onBackstory, onHighlight }, ref) {
    const scrollRef = useRef<HTMLElement>(null)
    const openAtOnMount = useRef(startAt)
    const [heroProgress, setHeroProgress] = useState(startAt === 'home' ? 0 : 1)

    const getPanelOffsets = useCallback(() => {
      const el = scrollRef.current
      if (!el) return { home: 0, about: 0, experience: 0 }

      const getOffset = (section: Section) => {
        const panel = el.querySelector<HTMLElement>(`[data-scroll-section="${section}"]`)
        return panel?.offsetTop ?? 0
      }

      return {
        home: getOffset('home'),
        about: getOffset('about'),
        experience: getOffset('experience'),
      }
    }, [])

    const scrollToSection = useCallback(
      (section: Section, behavior: ScrollBehavior = 'smooth') => {
        const el = scrollRef.current
        if (!el) return
        const offsets = getPanelOffsets()
        el.scrollTo({ top: offsets[section], behavior })
      },
      [getPanelOffsets],
    )

    useImperativeHandle(ref, () => ({ scrollToSection }), [scrollToSection])

    // Jump to initial section without animation on mount
    useEffect(() => {
      const section = openAtOnMount.current
      if (section === 'home') return
      const el = scrollRef.current
      if (!el) return

      requestAnimationFrame(() => {
        const offsets = getPanelOffsets()
        el.scrollTop = offsets[section]
        setHeroProgress(1)
      })
    }, [getPanelOffsets])

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      const onScroll = () => {
        const vh = el.clientHeight || window.innerHeight
        const st = el.scrollTop

        // Hero progress (0 = at hero, 1 = fully past hero)
        const progress = Math.min(1, Math.max(0, st / Math.max(vh, 1)))
        setHeroProgress(progress)

        // Which section are we closest to?
        const offsets = getPanelOffsets()
        const currentSection = SECTIONS.reduce((closest, section) => {
          const closestDistance = Math.abs(st - offsets[closest])
          const sectionDistance = Math.abs(st - offsets[section])
          return sectionDistance < closestDistance ? section : closest
        }, 'home' as Section)

        onSectionChange(currentSection)
      }

      el.addEventListener('scroll', onScroll, { passive: true })

      const ro = new ResizeObserver(onScroll)
      ro.observe(el)
      onScroll()

      return () => {
        el.removeEventListener('scroll', onScroll)
        ro.disconnect()
      }
    }, [getPanelOffsets, onSectionChange])

    const handleBackFromExperience = () => {
      scrollToSection('about')
    }

    const showScrollNav = heroProgress > 0.35

    return (
      <>
      <ScrollNav
        visible={showScrollNav}
        onHome={() => scrollToSection('home')}
        onExperience={() => scrollToSection('experience')}
        onAbout={() => scrollToSection('about')}
        onCatalog={onCatalog}
      />
      <section ref={scrollRef} className="home-scroll" aria-label="Main content">
        {/* Panel 0 — Hero */}
        <div
          className="home-scroll-panel home-scroll-panel--hero"
          data-scroll-section="home"
          style={{ '--hero-reveal-progress': heroProgress } as CSSProperties}
          aria-hidden={heroProgress > 0.92}
        >
          {hero}
        </div>

        {/* Panel 1 — About */}
        <div
          className="home-scroll-panel home-scroll-panel--about"
          data-scroll-section="about"
          aria-hidden={heroProgress < 0.08}
        >
          <main className="experience-page home-about-panel">
            <AboutSection onLearnMore={onBackstory} />
          </main>
        </div>

        {/* Panel 2 — Experience */}
        <div className="home-scroll-panel home-scroll-panel--experience" data-scroll-section="experience">
          <ExperiencePage
            onBack={handleBackFromExperience}
            onCatalog={onCatalog}
            onHighlight={onHighlight}
          />
        </div>

        <div className="home-scroll-panel home-scroll-panel--footer">
          <SiteFooter />
        </div>

      </section>
      </>
    )
  },
)
