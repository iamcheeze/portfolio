import { CardButton } from './CardButton'
import { NavButton } from './NavButton'
import aTaleOf2Thumbnail from './assets/ATaleOf2Thumbnail.png'
import assassinsThumbnail from './assets/AssassinsThumbnail.png'
import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import mindlockThumbnail from './assets/MindlockThumbnail.png'
import snowLoopThumbnail from './assets/SnowLoopThumbnail.png'
import eagleQuestThumbnail from './assets/EagleQuestThumbnail.png'
import klCartRacingThumbnail from './assets/KLCartRacingThumbnail.png'
import ARDSThumbnail from './assets/ARDSThumbnail.png'
import cabezaDeLazoThumbnail from './assets/CabezaDeLazoThumbnail.png'
import cheezeAndTheChickenNuggetThumbnail from './assets/CheezeAndTheChickenNuggetThumbnail.png'
import diceheadThumbnail from './assets/DiceheadThumbnail.png'
import findThePepperThumbnail from './assets/FindThePepper.png'
import klDarkDescent2Thumbnail from './assets/KLDarkDescent2Thumbnail.png'
import scalingSomeScalesThumbnail from './assets/ScalingSomeScalesThumbnail.png'

type ExperiencePageProps = {
  onBack: () => void
}

const placeholderItems = [
  {
    label: 'Project Director',
    title: 'MINDLOCK MUSEUM',
    image: mindlockThumbnail,
    href: 'https://iamcheeze.itch.io/mindlock-museum',
  },
  {
    label: 'Personal Project',
    title: 'CITRUS BEATDOWN',
    image: citrusBeatdownThumbnail,
    href: 'https://iamcheeze.itch.io/citrus-beatdown',
  },
  {
    label: 'Project Director',
    title: 'ASSASSINS',
    image: assassinsThumbnail,
    href: 'https://iamcheeze.itch.io/assassins',
  },
  {
    label: 'Game Jam Entry',
    title: 'SnowLoop',
    image: snowLoopThumbnail,
    href: 'https://iamcheeze.itch.io/snowloop',
  },
  {
    label: 'Project Director',
    title: 'Eagle Quest',
    image: eagleQuestThumbnail,
    href: 'https://ahs-game-development-club.itch.io/eagle-quest',
  },
  {
    label: 'Personal Project',
    title: 'KL Cart Racing',
    image: klCartRacingThumbnail,
    href: 'https://iamcheeze.itch.io/kl-cart-racing',
  },
  {
    label: 'Game Jam Entry',
    title: '¡Cabeza de Lazo!',
    image: cabezaDeLazoThumbnail,
    href: 'https://iamcheeze.itch.io/cabeza-de-lazo',
  },
  {
    label: 'Game Jam Entry',
    title: 'Scaling Some Scales',
    image: scalingSomeScalesThumbnail,
    href: 'https://iamcheeze.itch.io/scaling-some-scales',
  },
  {
    label: 'Personal Project',
    title: 'Cheeze and the Chicken Nugget',
    image: cheezeAndTheChickenNuggetThumbnail,
    href: 'https://iamcheeze.itch.io/cheeze-and-the-chicken-nugget',
  },
  {
    label: 'Game Jam Entry',
    title: 'A Tale of 2',
    image: aTaleOf2Thumbnail,
    href: 'https://iamcheeze.itch.io/a-tale-of-2',
  },
  {
    label: 'Personal Project',
    title: 'KL: The Dark Descent 2',
    image: klDarkDescent2Thumbnail,
    href: 'https://iamcheeze.itch.io/kl-the-dark-descent-2',
  },
]

const categoryItems = [
  {
    title: 'PERSONAL PROJECTS',
    image: citrusBeatdownThumbnail,
  },
  {
    title: 'PROFESSIONAL EXPERIENCE',
    image: ARDSThumbnail,
  },
  {
    title: 'LEADERSHIP EXPERIENCE',
    image: mindlockThumbnail,
  },
]

export function ExperiencePage({ onBack }: ExperiencePageProps) {
  const scrollingItems = [...placeholderItems, ...placeholderItems]

  return (
    <main className="experience-page" aria-labelledby="experience-title">
      <div className="experience-glow" aria-hidden="true" />

      <section className="experience-shell">
        <header className="experience-header">
          <h1 id="experience-title" className="experience-title">
            EXPERIENCE
          </h1>
        </header>
        <nav className="nav-panel" aria-label="Experience navigation">
          <NavButton onClick={onBack}>CATALOG SEARCH</NavButton>
        </nav>
        <div className="experience-marquee" aria-label="Experience image placeholders">
          <div className="experience-track">
            {scrollingItems.map((item, index) => {
              const isDuplicate = index >= placeholderItems.length

              return (
                <CardButton
                  key={`${item.label}-${index}`}
                  href={item.href}
                  image={item.image}
                  label={item.label}
                  title={item.title}
                  aria-hidden={isDuplicate}
                  tabIndex={isDuplicate ? -1 : 0}
                />
              )
            })}
          </div>
        </div>

        <nav className="experience-category-grid" aria-label="Experience categories">
          {categoryItems.map((item) => (
            <button className="experience-category-card" key={item.title} type="button">
              <span className="experience-category-image">
                <img src={item.image} alt="" />
              </span>
              <span className="experience-category-title">{item.title}</span>
            </button>
          ))}
        </nav>
        <nav className="nav-panel experience-nav" aria-label="Experience navigation">
          <NavButton onClick={onBack}>BACK</NavButton>
        </nav>
      </section>
    </main>
  )
}
