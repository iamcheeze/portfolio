import { NavButton } from './NavButton'

type ContactPageDrops = {
  onBack: () => void
}

export function ContactPage({ onBack }: ContactPageDrops) {

  return (
<main className="experience-page" aria-labelledby="experience-title">
      <div className="experience-glow" aria-hidden="true" />
    <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            CONTACT INFORMATION
          </h1>
        </header>
<nav className="nav-panel" aria-label="Experience navigation" style={{ display: 'block', padding: '1.5rem' }}>
  <p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)', color: 'var(--yellow)', lineHeight: '1.5' }}>
    CONTACT ME HERE NOW!
  </p>
</nav>
    <nav className="nav-panel experience-nav" aria-label="Experience navigation">
        <NavButton onClick={onBack}>BACK</NavButton>
    </nav>
    </section>
</main>
  )
}
