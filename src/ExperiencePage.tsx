import { useState, useEffect } from 'react'
import { CardButton } from './CardButton'
import { NavButton } from './NavButton'
import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import ARDSThumbnail from './assets/ARDSThumbnail.png'
import mindlockThumbnail from './assets/MindlockThumbnail.png'
import JumpPromoImage1 from './assets/JumpPromoImage1.png'
import MindlockMuseumPromoImage2 from './assets/MindlockMuseum2.png'
import RedHighlight1 from './assets/RedHighlight.jpg'
import { scrollingTrackProjectItems } from './projectItems'

const categoryItems = [
  {
    title: 'PERSONAL PROJECTS',
    mobileTitle: 'Personal Projects ✨',
    image: citrusBeatdownThumbnail,
  },
  {
    title: 'PROFESSIONAL EXPERIENCE',
    mobileTitle: 'Professional Experience 🎯',
    image: ARDSThumbnail,
  },
  {
    title: 'LEADERSHIP EXPERIENCE',
    mobileTitle: 'Leadership Experience 🚀',
    image: mindlockThumbnail,
  },
]

const highlightsData = [
  {
    title: 'ACUTE RESPIRATORY DISTRESS SIMULATION',
    description: 'I CREATED AN IMMERSIVE VITALS MONITOR AND VENTILATION SYSTEM FOR OUR VIRTUAL PATIENT, WHICH WE THEN VALIDATED THROUGH USER TESTING AND FEEDBACK WITH 65 M1 MEDICAL STUDENTS!',
    subtitle: 'PROFESSIONAL EXPERIENCE',
    image: JumpPromoImage1,
  },
  {
    title: 'MINDLOCK MUSEUM',
    description: 'I lead and directed a 17 person team of software developers, 2D/3D artists, and UI/UX designers to create a mixed media detective game!',
    subtitle: 'LEADERSHIP EXPERIENCE',
    image: MindlockMuseumPromoImage2,
  },
  {
    title: 'PAINT THE WORLD RED',
    description: 'I AM CREATING A NARRATIVE DRIVEN GAME THAT ALLOWS YOU TO TRAVERSE AN OPEN WORLD THROUGH A DYNAMIC COMBAT SYSTEM WHILE DOCUMENTING MY DEVELOPMENT ONLINE!',
    subtitle: 'PERSONAL PROJECT',
    image: RedHighlight1,
  },
]

type ExperiencePageProps = {
  onBack: () => void
  onCatalog: () => void
}

export function ExperiencePage({ onBack, onCatalog }: ExperiencePageProps) {
  const scrollingItems = [...scrollingTrackProjectItems, ...scrollingTrackProjectItems]
  const [currentHighlight, setCurrentHighlight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlightsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextHighlight = () => {
    setCurrentHighlight((prev) => (prev + 1) % highlightsData.length)
  }

  const goToHighlight = (index: number) => {
    setCurrentHighlight(index)
  }

  return (
    <main className="experience-page" aria-labelledby="experience-title">
      <div className="experience-glow" aria-hidden="true" />

      <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            MY EXPERIENCE
          </h1>
        </header>

<p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)', color: 'var(--yellow)', lineHeight: '1.5' }}>
            Check out projects I have created and contributed to here! </p>

        <div className="highlights-carousel">
          {/* Slides Track Loop */}
          {highlightsData.map((highlight, index) => (
            <div
              key={index}
              className={`highlight-card ${index === currentHighlight ? 'active' : ''}`}
            >
              {/* Background image is now global to the entire card layout */}
              <div className="highlight-image">
                <img src={highlight.image} alt="" />
              </div>

              {/* Foreground content blocks */}
              <div className="highlight-content">
                <h2 className="highlight-title">{highlight.title}</h2>
                <span className="highlight-subtitle">{highlight.subtitle}</span>
                <p className="highlight-description">{highlight.description}</p>
              </div>

              {/* Sidebar layout cleanly contained inside each layer slide stack */}
              <div className="highlight-nav-sidebar">
                <button
                  className="highlight-nav-button"
                  onClick={nextHighlight}
                  aria-label="Next highlight"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Dots Indicators overlay navigation */}
          <div className="highlights-dots">
            {highlightsData.map((_, index) => (
              <button
                key={index}
                className={`highlight-dot ${index === currentHighlight ? 'active' : ''}`}
                onClick={() => goToHighlight(index)}
                aria-label={`Go to highlight ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <nav className="experience-category-grid" aria-label="Experience categories">
          {categoryItems.map((item) => (
            <button className="experience-category-card" key={item.title} type="button">
              <span className="experience-category-image experience-category-desktop-only">
                <img src={item.image} alt="" />
              </span>
              <span className="experience-category-title experience-category-desktop-only">{item.title}</span>
              <span className="experience-category-title experience-category-mobile-only">{item.mobileTitle}</span>
            </button>
          ))}
        </nav>

        <nav className="nav-panel" aria-label="Experience navigation" style={{ display: 'block', padding: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: 'clamp(0.85rem, 1.8vw, 1.2rem)', color: 'var(--yellow)', lineHeight: '1.5' }}>
            USE THE CATALOG SEARCH TO BROWSE MY ENTIRE PROJECT ARCHIVE!{' '}<br /><br />
            <span style={{ display: 'inline-block', margin: '0 0.5rem', verticalAlign: 'middle' }}>
              <NavButton onClick={onCatalog}>
                CATALOG SEARCH
              </NavButton>
            </span>
          </p>
        </nav>

        <div className="experience-marquee" aria-label="Experience image placeholders">
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
        </div>

        <nav className="nav-panel experience-nav" aria-label="Experience navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      </section>
    </main>
  )
}