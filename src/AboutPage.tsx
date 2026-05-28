import { useEffect, useState } from 'react'
import { NavButton } from './NavButton'
import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import RedHighlight from './assets/RedHighlight.jpg'
import MindlockMuseum2 from './assets/MindlockMuseum2.png'

type AboutSectionProps = {
  showBack?: boolean
  onBack?: () => void
}

export function AboutSection({ showBack = false, onBack }: AboutSectionProps) {
  const slideshowImages = [citrusBeatdownThumbnail, RedHighlight, MindlockMuseum2]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowImages.length)
    }, 3200)

    return () => window.clearInterval(intervalId)
  }, [slideshowImages.length])

  return (
    <section className="experience-shell about-section" aria-labelledby="about-title">
      <header className="experience-header">
        <h1 id="about-title" className="experience-title">
          WHO AM I?
        </h1>
      </header>

      <div className="about-grid">
        <article className="about-card about-photo-card" aria-label="Photo slideshow">
          {slideshowImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              aria-hidden={index !== activeSlide}
              className={`about-photo-slide ${index === activeSlide ? 'is-active' : ''}`}
            />
          ))}
        </article>

        <article className="about-card about-points-card" aria-label="About highlights">
          <ul className="about-points-list">
            <li>6+ years of experience in game development</li>
            <li>Realtime simulation software development experience</li>
            <li>Obsessed with making playful ideas feel smooth and memorable.</li>
          </ul>
        </article>

        <article className="about-card about-bio-card" aria-label="About bio">
          <p>
            I am a developer and creative builder who loves turning ideas into polished interactive
            experiences. I enjoy game development, UI engineering, and blending visual design with
            reliable code. I am always exploring new tools and workflows that help me ship faster
            while keeping quality high.
          </p>
        </article>
      </div>

      {showBack && onBack ? (
        <nav className="nav-panel experience-nav" aria-label="About navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      ) : null}
    </section>
  )
}

type AboutPageProps = {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <main className="experience-page" aria-labelledby="about-title">
      <div className="experience-glow" aria-hidden="true" />
      <AboutSection showBack onBack={onBack} />
    </main>
  )
}
