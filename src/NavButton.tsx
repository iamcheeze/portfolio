import type { ReactNode } from 'react'

type NavButtonProps = {
  children: ReactNode
  href?: string
}

export function NavButton({ children, href }: NavButtonProps) {
  if (href) {
    return (
      <a className="nav-btn" href={href}>
        <span className="nav-btn-face">{children}</span>
      </a>
    )
  }

  return (
    <button type="button" className="nav-btn">
      <span className="nav-btn-face">{children}</span>
    </button>
  )
}
