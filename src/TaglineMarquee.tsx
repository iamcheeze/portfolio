import { useEffect, useState } from 'react'

const TAGLINES = [
  '6+ YEARS OF UNITY/C# EXPERIENCE',
  'UIUC COMPUTER SCIENCE STUDENT',
  'PROFESSIONAL SIMULATION SOFTWARE DEVELOPER',
  'AI INTEGRATION ENGINEERING',
] as const

const ROTATE_MS = 3600

function formatTagline(line: string) {
  return `• ${line} •`
}

export function TaglineMarquee() {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setReduceMotion(media.matches)
    syncMotion()
    media.addEventListener('change', syncMotion)
    return () => media.removeEventListener('change', syncMotion)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % TAGLINES.length)
    }, ROTATE_MS)

    return () => window.clearInterval(interval)
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <p className="hero-tagline">
        <span className="hero-tagline-line">{formatTagline(TAGLINES[0])}</span>
      </p>
    )
  }

  return (
    <p className="hero-tagline">
      <span className="hero-tagline-sr">{TAGLINES.map(formatTagline).join(' ')}</span>
      <span className="hero-tagline-viewport" aria-hidden="true">
        <span key={index} className="hero-tagline-line">
          {formatTagline(TAGLINES[index])}
        </span>
      </span>
    </p>
  )
}
