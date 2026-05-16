import { CardButton } from './CardButton'
import { NavButton } from './NavButton'
import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import ARDSThumbnail from './assets/ARDSThumbnail.png'
import mindlockThumbnail from './assets/MindlockThumbnail.png'
import { projectItems } from './projectItems'

const categoryItems = [
  {
    title: 'PERSONAL PROJECTS',
    image: citrusBeatdownThumbnail,
  },
  {
    title: 'PROFESSIONAL EXPERIENCE',
    image: ARDSThumbnail,
  },
  {
    title: 'LEADERSHIP EXPERIENCE',
    image: mindlockThumbnail,
  },
]

type ExperiencePageProps = {
  onBack: () => void
  onCatalog: () => void
}

export function ExperiencePage({ onBack, onCatalog }: ExperiencePageProps) {
  const scrollingItems = [...projectItems, ...projectItems]

  return (
    <main className="experience-page" aria-labelledby="experience-title">
      <div className="experience-glow" aria-hidden="true" />

      <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            EXPERIENCE
          </h1>
        </header>
        <nav className="experience-category-grid" aria-label="Experience categories">
          {categoryItems.map((item) => (
            <button className="experience-category-card" key={item.title} type="button">
              <span className="experience-category-image">
                <img src={item.image} alt="" />
              </span>
              <span className="experience-category-title">{item.title}</span>
            </button>
          ))}
        </nav>
        <div className="experience-marquee" aria-label="Experience image placeholders">
          <div className="experience-track">
            {scrollingItems.map((item, index) => {
              const isDuplicate = index >= projectItems.length

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
        </div>
                <nav className="nav-panel" aria-label="Experience navigation" style={{ display: 'block', padding: '1.5rem' }}>
  <p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)', color: 'var(--yellow)', lineHeight: '1.5' }}>
    USE THE CATALOG SEARCH TO BROWSE MY ENTIRE PROJECT ARCHIVE!{' '}<br /><br />
    <span style={{ display: 'inline-block', margin: '0 0.5rem', verticalAlign: 'middle' }}>
      <NavButton onClick={onCatalog} href="#/catalog">
        CATALOG SEARCH
      </NavButton>
    </span>
  </p>
</nav>
        <nav className="nav-panel experience-nav" aria-label="Experience navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      </section>
    </main>
  )
}
