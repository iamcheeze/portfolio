import { useEffect, useState } from 'react'
import { NavButton } from './NavButton'
import rayan1 from './assets/Rayan1.png'
import rayan2 from './assets/Rayan3.png'
import rayan3 from './assets/RayanGhosh3.jpg'

type AboutSectionProps = {
  onLearnMore?: () => void
}

export function AboutSection({ onLearnMore }: AboutSectionProps) {
  const slideshowImages = [rayan1, rayan2, rayan3]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowImages.length)
    }, 6400)

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

        <div className="about-content-column">
          <article className="about-card about-bio-card" aria-label="About bio">
            <p>
              <b>Hi, I’m Rayan!</b>
              <br />
              <br />
              I’m a software developer from Fremont, CA and I'm currently pursuing a bachelor's degree in{' '}
              Computer Science + Education at <b>the University of Illinois at Urbana-Champaign</b>, specializing in human-computer
              interaction and AI engineering.
              <br />
              <br />
              With over <b>6+ years of experience in Unity/C#</b>, my work focuses on bridging the gap between high-fidelity simulations and cutting-edge
              technology, creating deeply polished, interactive experiences that integrate real-time AI.
              <br />
              <br />
              I love tackling complex technical challenges to build immersive applications that have a
              meaningful, real-world impact!
            </p>
          </article>

          <div className="about-actions">
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
          <NavButton onClick={onLearnMore} href="#/backstory">
            MY JOURNEY
          </NavButton>
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
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <main className="experience-page" aria-labelledby="about-title">
      <AboutSection />
    </main>
  )
}
