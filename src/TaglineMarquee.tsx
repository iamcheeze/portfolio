/** One full loop: three tags + bullets; duplicated in the track for seamless scroll. */
const TAGLINE_SEGMENT =
  '6+ YEARS OF UNITY/C# EXPERIENCE • UIUC COMPUTER SCIENCE STUDENT • PROFESSIONAL SIMULATION SOFTWARE DEVELOPER • AI INTEGRATION ENGINEERING • 6+ YEARS OF UNITY/C# EXPERIENCE • UIUC COMPUTER SCIENCE STUDENT • PROFESSIONAL SIMULATION SOFTWARE DEVELOPER • AI INTEGRATION ENGINEERING • 6+ YEARS OF UNITY/C# EXPERIENCE • UIUC COMPUTER SCIENCE STUDENT • PROFESSIONAL SIMULATION SOFTWARE DEVELOPER • AI INTEGRATION ENGINEERING • 6+ YEARS OF UNITY/C# EXPERIENCE • UIUC COMPUTER SCIENCE STUDENT • PROFESSIONAL SIMULATION SOFTWARE DEVELOPER • AI INTEGRATION ENGINEERING • '

export function TaglineMarquee() {
  return (
    <p className="hero-tagline">
      <span className="hero-tagline-sr">
        GAME DEVELOPMENT, SIMULATION SOFTWARE, AI ENGINEERING
      </span>
      <span className="hero-tagline-viewport" aria-hidden="true">
        <span className="hero-tagline-track">
          <span className="hero-tagline-chunk">{TAGLINE_SEGMENT}</span>
          <span className="hero-tagline-chunk">{TAGLINE_SEGMENT}</span>
        </span>
      </span>
    </p>
  )
}
