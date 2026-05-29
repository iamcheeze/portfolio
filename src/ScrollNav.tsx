import { useEffect, useState, type MouseEvent } from 'react'
import youtubeIcon from './assets/youtube.svg'
import instagramIcon from './assets/instagramIcon.svg'
import linkedinIcon from './assets/linkedinIcon.svg'

const RESUME_URL =
  'https://drive.google.com/file/d/1XjYry0P2eFwgLl42o_59LYiaFuc3QeTJ/view'

const scrollNavSocialLinks = [
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@iamcheezeYT',
    icon: youtubeIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/iamrayanghosh/',
    icon: instagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rayan-ghosh-830a04386/',
    icon: linkedinIcon,
  },
] as const

type ScrollNavProps = {
  visible: boolean
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

function ScrollNavLabel({ full, short }: { full: string; short: string }) {
  return (
    <>
      <span className="scroll-nav-label scroll-nav-label--full">{full}</span>
      <span className="scroll-nav-label scroll-nav-label--short" aria-hidden="true">
        {short}
      </span>
    </>
  )
}

function ScrollNavLink({
  href,
  onClick,
  full,
  short,
}: {
  href: string
  onClick: () => void
  full: string
  short: string
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick()
  }

  return (
    <a className="scroll-nav-link" href={href} onClick={handleClick} aria-label={full}>
      <ScrollNavLabel full={full} short={short} />
    </a>
  )
}

type ScrollNavLinksProps = {
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
  onNavigate?: () => void
  className?: string
}

function ScrollNavLinks({
  onExperience,
  onAbout,
  onCatalog,
  onNavigate,
  className = '',
}: ScrollNavLinksProps) {
  const afterNav = () => onNavigate?.()

  return (
    <nav className={className} aria-label="Main">
      <ScrollNavLink
        href="#/experience"
        onClick={() => {
          onExperience()
          afterNav()
        }}
        full="EXPERIENCE"
        short="EXPERIENCE"
      />
      <ScrollNavLink
        href="#/about"
        onClick={() => {
          onAbout()
          afterNav()
        }}
        full="WHO AM I?"
        short="ABOUT"
      />
      <ScrollNavLink
        href="#/catalog"
        onClick={() => {
          onCatalog()
          afterNav()
        }}
        full="CATALOG"
        short="CATALOG"
      />
      <a
        className="scroll-nav-link"
        href={RESUME_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Resume"
        onClick={afterNav}
      >
        <ScrollNavLabel full="RESUME" short="CV" />
      </a>
    </nav>
  )
}

export function ScrollNav({
  visible,
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: ScrollNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!visible) setMenuOpen(false)
  }, [visible])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`scroll-nav ${visible ? 'scroll-nav--visible' : ''}`}
      aria-label="Site navigation"
      aria-hidden={!visible}
    >
      <div className="scroll-nav-bar">
        <div className="scroll-nav-brand">
          <button type="button" className="scroll-nav-name" onClick={onHome}>
            <img className="scroll-nav-logo" src="/cheezeIcon.svg" alt="" aria-hidden="true" />
            <span className="scroll-nav-label scroll-nav-label--full">RAYAN GHOSH</span>
            <span className="scroll-nav-label scroll-nav-label--short" aria-hidden="true">
              RAYAN G.
            </span>
          </button>

          <nav className="scroll-nav-social" aria-label="Social media">
            {scrollNavSocialLinks.map((item) => (
              <a
                className="social-btn scroll-nav-social-btn"
                href={item.href}
                key={item.label}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <img src={item.icon} alt="" />
              </a>
            ))}
          </nav>
        </div>

        <ScrollNavLinks
          className="scroll-nav-links scroll-nav-links--desktop"
          onExperience={onExperience}
          onAbout={onAbout}
          onCatalog={onCatalog}
        />

        <button
          type="button"
          className={`scroll-nav-menu-btn ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="scroll-nav-menu-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="scroll-nav-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <div
          id="scroll-nav-menu-panel"
          className={`scroll-nav-menu-panel ${menuOpen ? 'is-open' : ''}`}
          hidden={!menuOpen}
        >
          <ScrollNavLinks
            className="scroll-nav-links scroll-nav-links--mobile"
            onExperience={onExperience}
            onAbout={onAbout}
            onCatalog={onCatalog}
            onNavigate={closeMenu}
          />
        </div>
      </div>
    </header>
  )
}
