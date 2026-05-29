import type { CSSProperties } from 'react'

type CardButtonProps = {
  href: string
  image: string
  label: string
  title: string
  ariaHidden?: boolean
  tabIndex?: number
  className?: string
  style?: CSSProperties
}

export function CardButton({
  href,
  image,
  label,
  title,
  ariaHidden,
  tabIndex,
  className,
  style,
}: CardButtonProps) {
  return (
    <a
      className={className ? `card-button ${className}` : 'card-button'}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
      aria-label={`${label}: ${title}`}
      style={style}
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
