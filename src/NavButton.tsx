import type { ReactNode, MouseEvent } from 'react'

type NavButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
}

export function NavButton({ children, href, onClick }: NavButtonProps) {
  const handleClick = (e: MouseEvent) => {
    if (onClick) {
      // Prevent the default anchor jump so our custom transition can run
      if (href) e.preventDefault()
      onClick()
    }
  }

  if (href) {
    return (
      <a className="nav-btn" href={href} onClick={handleClick}>
        <span className="nav-btn-face">{children}</span>
      </a>
    )
  }

  return (
    <button type="button" className="nav-btn" onClick={onClick}>
      <span className="nav-btn-face">{children}</span>
    </button>
  )
}