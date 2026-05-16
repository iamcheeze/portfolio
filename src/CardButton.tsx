type CardButtonProps = {
  href: string
  image: string
  label: string
  title: string
  ariaHidden?: boolean
  tabIndex?: number
}

export function CardButton({ href, image, label, title, ariaHidden, tabIndex }: CardButtonProps) {
  return (
    <a
      className="card-button"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
      aria-label={`${label}: ${title}`}
    >
      <div className="card-button-image">
        <img src={image} alt="" />
      </div>
      <div className="card-button-copy">
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
    </a>
  )
}
