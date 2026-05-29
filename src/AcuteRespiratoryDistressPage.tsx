import { HighlightProjectPage } from './HighlightProjectPage'
import { getHighlightById } from './highlightsData'

type AcuteRespiratoryDistressPageProps = {
  onBack: () => void
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

export function AcuteRespiratoryDistressPage(props: AcuteRespiratoryDistressPageProps) {
  const highlight = getHighlightById('ards')!

  return <HighlightProjectPage highlight={highlight} {...props} />
}
