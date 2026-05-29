import { ExternalLinkButton } from './ExternalLinkButton'
import { NavButton } from './NavButton'
import { ScrollNav } from './ScrollNav'
import type { HighlightItem } from './highlightsData'

type HighlightProjectPageProps = {
  highlight: HighlightItem
  onBack: () => void
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

export function HighlightProjectPage({
  highlight,
  onBack,
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: HighlightProjectPageProps) {
  return (
    <>
      <ScrollNav
        visible
        onHome={onHome}
        onExperience={onExperience}
        onAbout={onAbout}
        onCatalog={onCatalog}
      />
      <main
        className="experience-page highlight-project-page"
        aria-labelledby="highlight-project-title"
      >
        <section className="experience-shell">
          <header className="experience-header">
            <h1 id="highlight-project-title" className="experience-title">
              {highlight.title}
            </h1>
            <p className="highlight-project-subtitle">{highlight.subtitle}</p>
          </header>

          <div className="highlight-project-hero">
            <img src={highlight.image} alt="" />
          </div>

          <p className="highlight-project-description">{highlight.description}</p>

          <nav className="nav-panel experience-nav" aria-label="Project navigation">
            <ExternalLinkButton href={highlight.externalHref}>VIEW PROJECT</ExternalLinkButton>
            <NavButton onClick={onBack}>BACK TO EXPERIENCE</NavButton>
          </nav>
        </section>
      </main>
    </>
  )
}
