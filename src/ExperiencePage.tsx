import { NavButton } from './NavButton'
import heroImage from './assets/hero.png'

type ExperiencePageProps = {
  onBack: () => void
}

const placeholderItems = [
  {
    label: 'Internship',
    title: 'Systems Work',
    image: heroImage,
  },
  {
    label: 'Interface',
    title: 'Motion Study',
    image: heroImage,
  },
  {
    label: 'Creative',
    title: '3D Prototype',
    image: heroImage,
  },
  {
    label: 'Product',
    title: 'Dashboard UI',
    image: heroImage,
  },
  {
    label: 'Research',
    title: 'Case Study',
    image: heroImage,
  },
  {
    label: 'Launch',
    title: 'Build Notes',
    image: heroImage,
  },
]

export function ExperiencePage({ onBack }: ExperiencePageProps) {
  const scrollingItems = [...placeholderItems, ...placeholderItems]

  return (
    <main className="experience-page" aria-labelledby="experience-title">
      <div className="experience-glow" aria-hidden="true" />

      <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            EXPERIENCE
          </h1>
        </header>

        <div className="experience-marquee" aria-label="Experience image placeholders">
          <div className="experience-track">
            {scrollingItems.map((item, index) => (
              <article
                className="experience-card"
                key={`${item.label}-${index}`}
                aria-hidden={index >= placeholderItems.length}
              >
                <div className="experience-card-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="experience-card-copy">
                  <p>{item.label}</p>
                  <h2>{item.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>

        <nav className="nav-panel experience-nav" aria-label="Experience navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      </section>
    </main>
  )
}
