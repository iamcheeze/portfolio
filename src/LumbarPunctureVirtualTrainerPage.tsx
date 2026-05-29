import { ExternalLinkButton } from './ExternalLinkButton'
import { ScrollNav } from './ScrollNav'
import { getHighlightById } from './highlightsData'
import type { HighlightPageProps } from './highlightPageTypes'

export function LumbarPunctureVirtualTrainerPage({
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: HighlightPageProps) {
  const highlight = getHighlightById('lumbar-puncture')!

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
        className="experience-page lumbar-puncture-page"
        aria-labelledby="lumbar-puncture-title"
      >
        <section className="experience-shell">
          <header className="experience-header">
            <h1 id="lumbar-puncture-title" className="experience-title">
              {highlight.title}
            </h1>
            <p className="highlight-project-subtitle">{highlight.subtitle}</p>
          </header>

          <article className="about-card backstory-card" aria-label="Lumbar Puncture Virtual Trainer details">
            <p>I am currently still working on this page! Click <b>View Project</b> to interact with the project!</p>
          </article>

          <nav className="nav-panel experience-nav" aria-label="Lumbar Puncture Virtual Trainer navigation">
            <ExternalLinkButton href={highlight.externalHref}>VIEW PROJECT</ExternalLinkButton>
          </nav>
        </section>
      </main>
    </>
  )
}
