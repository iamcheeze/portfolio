import { ExternalLinkButton } from './ExternalLinkButton'
import { ScrollNav } from './ScrollNav'
import { getHighlightById } from './highlightsData'
import type { HighlightPageProps } from './highlightPageTypes'

export function CitrusBeatdownPage({
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: HighlightPageProps) {
  const highlight = getHighlightById('citrus-beatdown')!

  return (
    <>
      <ScrollNav
        visible
        onHome={onHome}
        onExperience={onExperience}
        onAbout={onAbout}
        onCatalog={onCatalog}
      />
      <main className="experience-page citrus-beatdown-page" aria-labelledby="citrus-beatdown-title">
        <section className="experience-shell">
          <header className="experience-header">
            <h1 id="citrus-beatdown-title" className="experience-title">
              {highlight.title}
            </h1>
            <p className="highlight-project-subtitle">{highlight.subtitle}</p>
          </header>

          <article className="about-card backstory-card" aria-label="Citrus Beatdown details">
            <p>I am currently still working on this page! Click <b>View Project</b> to play the game!</p>
          </article>

          <nav className="nav-panel experience-nav" aria-label="Citrus Beatdown navigation">
            <ExternalLinkButton href={highlight.externalHref}>VIEW PROJECT</ExternalLinkButton>
          </nav>
        </section>
      </main>
    </>
  )
}
