import { NavButton } from './NavButton'
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

          {/* <div className="experience-marquee" aria-label="Experience image placeholders">
          <div className="experience-track">
            {scrollingItems.map((item, index) => {
              const isDuplicate = index >= scrollingTrackProjectItems.length

              return (
                <CardButton
                  key={`${item.label}-${index}`}
                  href={item.href}
                  image={item.image}
                  label={item.label}
                  title={item.title}
                  aria-hidden={isDuplicate}
                  tabIndex={isDuplicate ? -1 : 0}
                />
              )
            })}
          </div>
        </div>*/}
        <nav className="nav-panel" aria-label="Experience navigation" style={{ display: 'block', padding: '1.5rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)',
              color: 'var(--yellow)',
              lineHeight: '1.5',
            }}
          >
            USE THE CATALOG SEARCH TO BROWSE MY ENTIRE PROJECT ARCHIVE! <br />
            <br />
            <span style={{ display: 'inline-block', margin: '0 0.5rem', verticalAlign: 'middle' }}>
              <NavButton onClick={onCatalog}>CATALOG SEARCH</NavButton>
            </span>
          </p>
        </nav>
      </section>
    </main>
  )
}
