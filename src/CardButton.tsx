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
      className={className ? `highlight-grid-item ${className}` : 'highlight-grid-item'}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-hidden={ariaHidden}
      tabIndex={tabIndex}
      aria-label={`${label}: ${title}`}
      style={style}
    >
      <div className="highlight-grid-item-image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
      <div className="highlight-grid-item-copy">
        <span className="highlight-grid-item-subtitle">{label}</span>
        <h2 className="highlight-grid-item-title">{title}</h2>
      </div>
    </a>
  )
}
