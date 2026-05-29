import { HighlightProjectPage } from './HighlightProjectPage'
import { getHighlightById } from './highlightsData'

type PaintTheWorldRedPageProps = {
  onBack: () => void
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

export function PaintTheWorldRedPage(props: PaintTheWorldRedPageProps) {
  const highlight = getHighlightById('paint-the-world-red')!

  return <HighlightProjectPage highlight={highlight} {...props} />
}
