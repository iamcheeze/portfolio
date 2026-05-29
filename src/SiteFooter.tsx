export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <p>© {year} Rayan Ghosh. All rights reserved.</p>
    </footer>
  )
}
