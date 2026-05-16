import type { ReactNode, AnchorHTMLAttributes } from 'react'

// We extend standard HTML anchor attributes so TypeScript automatically supports 
// target, rel, href, and all other native <a> tag properties cleanly.
interface ExternalLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  href: string // Making href required since an external link button must point somewhere
}

export function ExternalLinkButton({ 
  children, 
  href, 
  target = '_blank',          // Defaults to opening in a new tab
  rel = 'noopener noreferrer', // Standard security best practice for target="_blank"
  ...props                    // Gathers any remaining props (like onClick, className, etc.)
}: ExternalLinkButtonProps) {
  
  return (
    <a 
      className="nav-btn" 
      href={href} 
      target={target} 
      rel={rel}
      {...props} // Spreads out any extra attributes automatically
    >
      <span className="nav-btn-face">{children}</span>
    </a>
  )
}