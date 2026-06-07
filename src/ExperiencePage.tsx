import { highlightsData, type HighlightId } from './highlightsData'

type ExperiencePageProps = {
  onBack: () => void
  onCatalog: () => void
  onHighlight: (id: HighlightId) => void
}

export function ExperiencePage({ onCatalog, onHighlight }: ExperiencePageProps) {

  return (
    <main className="experience-page" aria-labelledby="experience-title">
      <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            <br />
            MY EXPERIENCE
          </h1>
        </header>

        <p
          style={{
            margin: 0,
            fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)',
            color: 'var(--yellow)',
            lineHeight: '1.5',
          }}
        >
          Here are some highlights of my work! Click on a project to learn more.
        </p>

        <div className="highlights-grid" role="list" aria-label="Featured highlights">
          {highlightsData.map((highlight) => (
            <button
              key={highlight.id}
              type="button"
              className="highlight-grid-item"
              role="listitem"
              onClick={() => onHighlight(highlight.id)}
              aria-label={`${highlight.subtitle}: ${highlight.title}. ${highlight.description}`}
            >
              <div className="highlight-grid-item-image" aria-hidden="true">
                <img src={highlight.image} alt="" />
              </div>
              <div className="highlight-grid-item-copy">
                <span className="highlight-grid-item-subtitle">{highlight.subtitle}</span>
                <h2 className="highlight-grid-item-title">{highlight.title}</h2>
                <p className="highlight-grid-item-description">{highlight.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="experience-projects-actions">
          <span className="about-journey-hint about-journey-hint--left" aria-hidden="true">
            <svg
              className="about-journey-hint-arrow"
              width="36"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10H20M20 4L26 10L20 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <button
            type="button"
            className="glow-cta"
            onClick={onCatalog}
            aria-label="Browse the full project catalog"
          >
            <span className="glow-cta-glow" aria-hidden="true" />
            <span className="glow-cta-face">
              <span className="glow-cta-label">PROJECTS</span>
            </span>
          </button>
          <span className="about-journey-hint about-journey-hint--right" aria-hidden="true">
            <svg
              className="about-journey-hint-arrow"
              width="36"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 10H16M16 4L10 10L16 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </section>
    </main>
  )
}
