import { HighlightProjectPage } from './HighlightProjectPage'
import { getHighlightById } from './highlightsData'

type MindlockMuseumPageProps = {
  onBack: () => void
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

export function MindlockMuseumPage(props: MindlockMuseumPageProps) {
  const highlight = getHighlightById('mindlock')!

  return <HighlightProjectPage highlight={highlight} {...props} />
}
