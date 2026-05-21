import { NavButton } from './NavButton'

type AboutSectionProps = {
  showBack?: boolean
  onBack?: () => void
}

export function AboutSection({ showBack = false, onBack }: AboutSectionProps) {
  return (
    <section className="experience-shell about-section" aria-labelledby="about-title">
      <header className="experience-header">
        <h1 id="about-title" className="experience-title">
          WHO AM I?
        </h1>
      </header>

      <nav className="nav-panel" aria-label="About" style={{ display: 'block', padding: '1.5rem' }}>
        <p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)', color: 'var(--yellow)', lineHeight: '1.5' }}>
          Work In Progress!
        </p>
      </nav>

      {showBack && onBack ? (
        <nav className="nav-panel experience-nav" aria-label="About navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      ) : null}
    </section>
  )
}

type AboutPageProps = {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <main className="experience-page" aria-labelledby="about-title">
      <div className="experience-glow" aria-hidden="true" />
      <AboutSection showBack onBack={onBack} />
    </main>
  )
}
