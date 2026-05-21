type HomeTrackCardProps = {
  href: string
  image: string
  title: string
  ariaHidden?: boolean
  tabIndex?: number
}

export function HomeTrackCard({ href, image, title, ariaHidden, tabIndex }: HomeTrackCardProps) {
  return (
    <a
      className="home-track-card"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
      aria-label={title}
    >
      <img src={image} alt="" />
    </a>
  )
}
