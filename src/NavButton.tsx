import type { ReactNode } from 'react'

type NavButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
}

export function NavButton({ children, href, onClick }: NavButtonProps) {
  if (href) {
    return (
      <a className="nav-btn" href={href}>
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
