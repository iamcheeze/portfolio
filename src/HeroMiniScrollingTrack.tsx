import type { ProjectItem } from './projectItems'

type HeroMiniScrollingTrackProps = {
  track: ProjectItem[]
  uniqueCount: number
  direction?: 'rtl' | 'ltr'
  className?: string
}

export function HeroMiniScrollingTrack({
  track,
  uniqueCount,
  direction = 'rtl',
  className = '',
}: HeroMiniScrollingTrackProps) {
  return (
    <div className={`hero-mini-marquee ${className}`.trim()} aria-hidden="true">
      <div className={`hero-mini-track hero-mini-track--${direction}`}>
        {track.map((item, index) => {
          const isDuplicate = index >= uniqueCount

          return (
            <div
              key={`mini-${item.title}-${index}`}
              className="hero-mini-track-card"
              aria-hidden={isDuplicate}
            >
              <img src={item.image} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
