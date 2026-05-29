import { ExternalLinkButton } from './ExternalLinkButton'
import { ScrollNav } from './ScrollNav'
import { getHighlightById } from './highlightsData'
import type { HighlightPageProps } from './highlightPageTypes'

export function PaintTheWorldRedPage({
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: HighlightPageProps) {
  const highlight = getHighlightById('paint-the-world-red')!

  return (
    <>
      <ScrollNav
        visible
        onHome={onHome}
        onExperience={onExperience}
        onAbout={onAbout}
        onCatalog={onCatalog}
      />
      <main className="experience-page paint-the-world-red-page" aria-labelledby="paint-the-world-red-title">
        <section className="experience-shell">
          <header className="experience-header">
            <h1 id="paint-the-world-red-title" className="experience-title">
              {highlight.title}
            </h1>
            <p className="highlight-project-subtitle">{highlight.subtitle}</p>
          </header>

          <article className="about-card backstory-card" aria-label="Paint The World Red details">
            <p>I am currently still working on this page! Click <b>View Project</b> to view the project's social media page!</p>
          </article>

          <nav className="nav-panel experience-nav" aria-label="Paint The World Red navigation">
            <ExternalLinkButton href={highlight.externalHref}>VIEW PROJECT</ExternalLinkButton>
          </nav>
        </section>
      </main>
    </>
  )
}
