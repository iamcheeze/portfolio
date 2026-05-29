import { NavButton } from './NavButton'

type BackstoryPageProps = {
  onBack: () => void
}

export function BackstoryPage({ onBack }: BackstoryPageProps) {
  return (
    <main className="experience-page backstory-page" aria-labelledby="backstory-title">
      <section className="experience-shell backstory-shell">
        <header className="experience-header">
          <h1 id="backstory-title" className="experience-title">
            BACKSTORY
          </h1>
        </header>

        <div className="backstory-content">
          <article className="about-card backstory-card" aria-label="Backstory placeholder">
            <p>
              COMING SOON...
            </p>
          </article>

          <article className="about-card backstory-card backstory-card--placeholder" aria-hidden="true">
            <p>
              Check out other sections to learn more!
            </p>
          </article>
        </div>

        <nav className="nav-panel experience-nav" aria-label="Backstory navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      </section>
    </main>
  )
}
