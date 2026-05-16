import aTaleOf2Thumbnail from './assets/ATaleOf2Thumbnail.png'
import assassinsThumbnail from './assets/AssassinsThumbnail.png'
import backThroughTimeThumbnail from './assets/BackThroughTimeThumbnail.png'
import cabezaDeLazoThumbnail from './assets/CabezaDeLazoThumbnail.png'
import candyClasherThumbnail from './assets/CandyClasherThumbnail.png'
import cheezeAndTheChickenNuggetThumbnail from './assets/CheezeAndTheChickenNuggetThumbnail.png'
import citrusBeatThumbnail from './assets/CitrusBeatThumbnail.png'
import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import cupsRevengeThumbnail from './assets/CupsRevengeThumbnail.png'
import decryptorThumbnail from './assets/DecryptorThumbnail.png'
import diceheadThumbnail from './assets/DiceheadThumbnail.png'
import eagleQuestThumbnail from './assets/EagleQuestThumbnail.png'
import findThePepperThumbnail from './assets/FindThePepper.png'
import hoppToItThumbnail from './assets/HoppToItThumbnail.png'
import klCartRacingThumbnail from './assets/KLCartRacingThumbnail.png'
import klDarkDescent2Thumbnail from './assets/KLDarkDescent2Thumbnail.png'
import klTheDarkDescentThumbnail from './assets/KLTheDarkDescentThumbnail.png'
import mindlockThumbnail from './assets/MindlockThumbnail.png'
import nightsOutThumbnail from './assets/NightsOutThumbnail.png'
import rPCTournamentThumbnail from './assets/RPCTournamentThumbnail.png'
import scalingSomeScalesThumbnail from './assets/ScalingSomeScalesThumbnail.png'
import soulDoctorThumbnail from './assets/SoulDoctorThumbnail.png'
import snowLoopThumbnail from './assets/SnowLoopThumbnail.png'
import stressThumbnail from './assets/stressThumbnail.png'
import studentSorterThumbnail from './assets/studentSorterThumbnail.png'
import theMiningMoleThumbnail from './assets/TheMiningMoleThumbnail.png'
import EyeOfDemonThumbnail from './assets/EyeOfDemonThumbnail.png'
import studioillinois from './assets/thestudiologonew.png'
import jumpCenter from './assets/jumpCenterLogo.png'

export type ProjectItem = {
  label: string
  title: string
  image: string
  href: string
  tag: ProjectTag
}

export type ProjectTag =
  | 'Personal Project'
  | 'Professional Project'
  | 'Project Leadership'
  | 'Hackathon / Game Jam Entry'

export const projectTags: ProjectTag[] = [
  'Personal Project',
  'Professional Project',
  'Project Leadership',
  'Hackathon / Game Jam Entry',
]

export const projectItems: ProjectItem[] = [
  {
    label: 'Project Director',
    title: 'MINDLOCK MUSEUM',
    image: mindlockThumbnail,
    href: 'https://iamcheeze.itch.io/mindlock-museum',
    tag: 'Project Leadership',
  },
  {
    label: 'Personal Project',
    title: 'CITRUS BEATDOWN',
    image: citrusBeatdownThumbnail,
    href: 'https://iamcheeze.itch.io/citrus-beatdown',
    tag: 'Personal Project',
  },
  {
    label: 'Project Director',
    title: 'ASSASSINS',
    image: assassinsThumbnail,
    href: 'https://iamcheeze.itch.io/assassins',
    tag: 'Project Leadership',
  },
  {
    label: 'Game Jam Entry',
    title: 'SnowLoop',
    image: snowLoopThumbnail,
    href: 'https://iamcheeze.itch.io/snowloop',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Project Director',
    title: 'Eagle Quest',
    image: eagleQuestThumbnail,
    href: 'https://iamcheeze.itch.io/eagle-quest',
    tag: 'Project Leadership',
  },
  {
    label: 'Personal Project',
    title: 'KL Cart Racing',
    image: klCartRacingThumbnail,
    href: 'https://iamcheeze.itch.io/kl-cart-racing',
    tag: 'Personal Project',
  },
  {
    label: 'Game Jam Entry',
    title: '¡Cabeza de Lazo!',
    image: cabezaDeLazoThumbnail,
    href: 'https://iamcheeze.itch.io/cabeza-de-lazo',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'Scaling Some Scales',
    image: scalingSomeScalesThumbnail,
    href: 'https://iamcheeze.itch.io/scaling-some-scales',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Personal Project',
    title: 'Cheeze and the Chicken Nugget',
    image: cheezeAndTheChickenNuggetThumbnail,
    href: 'https://iamcheeze.itch.io/cheeze-and-the-chicken-nugget',
    tag: 'Personal Project',
  },
  {
    label: 'Game Jam Entry',
    title: 'A Tale of 2',
    image: aTaleOf2Thumbnail,
    href: 'https://iamcheeze.itch.io/a-tale-of-2',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Personal Project',
    title: 'KL: The Dark Descent 2',
    image: klDarkDescent2Thumbnail,
    href: 'https://iamcheeze.itch.io/kl-the-dark-descent-2',
    tag: 'Personal Project',
  },
  {
    label: 'Game Jam Entry',
    title: 'Dicehead',
    image: diceheadThumbnail,
    href: 'https://iamcheeze.itch.io/dicehead',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Personal Project',
    title: 'Find The Pepper',
    image: findThePepperThumbnail,
    href: 'https://iamcheeze.itch.io/find-the-pepper',
    tag: 'Personal Project',
  },
  {
    label: 'Game Jam Entry',
    title: 'Hopp to it!',
    image: hoppToItThumbnail,
    href: 'https://iamcheeze.itch.io/hopp-to-it',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Project Lead',
    title: 'Candy Clashers',
    image: candyClasherThumbnail,
    href: 'https://iamcheeze.itch.io/candy-clashers',
    tag: 'Project Leadership',
  },
  {
    label: 'Personal Project',
    title: 'Decryptor',
    image: decryptorThumbnail,
    href: 'https://iamcheeze.itch.io/decryptor',
    tag: 'Personal Project',
  },
  {
    label: 'Personal Project',
    title: 'ROCK PAPER SCISSORS TOURNAMENT',
    image: rPCTournamentThumbnail,
    href: 'https://iamcheeze.itch.io/rock-paper-scissors-tournament',
    tag: 'Personal Project',
  },
  {
    label: 'Personal Project',
    title: 'CITRUS BEATS',
    image: citrusBeatThumbnail,
    href: 'https://iamcheeze.itch.io/citrus-beats',
    tag: 'Personal Project',
  },
  {
    label: 'Game Jam Entry',
    title: 'STRESS',
    image: stressThumbnail,
    href: 'https://iamcheeze.itch.io/stress',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Personal Project',
    title: 'KL: The Dark Descent',
    image: klTheDarkDescentThumbnail,
    href: 'https://iamcheeze.itch.io/kl-the-dark-descent',
    tag: 'Personal Project',
  },
  {
    label: 'Project Lead',
    title: 'Soul Doctor',
    image: soulDoctorThumbnail,
    href: 'https://ahs-game-development-club.itch.io/soul-doctor',
    tag: 'Project Leadership',
  },
  {
    label: 'Hackathon Entry',
    title: 'Student Sorter 3000',
    image: studentSorterThumbnail,
    href: 'https://iamcheeze.itch.io/student-sorter-3000',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'The Mining Mole',
    image: theMiningMoleThumbnail,
    href: 'https://iamcheeze.itch.io/the-mining-mole',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'Nights Out!',
    image: nightsOutThumbnail,
    href: 'https://iamcheeze.itch.io/nights-out',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'Cups Revenge',
    image: cupsRevengeThumbnail,
    href: 'https://iamcheeze.itch.io/cups-revenge',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'Back Through Time!',
    image: backThroughTimeThumbnail,
    href: 'https://iamcheeze.itch.io/back-through-time',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'Game Jam Entry',
    title: 'Eye Of Demon',
    image: EyeOfDemonThumbnail,
    href: 'https://iamcheeze.itch.io/eye-of-demon',
    tag: 'Hackathon / Game Jam Entry',
  },
  {
    label: 'XR + AI Software Developer',
    title: 'Social Determinants of Health',
    image: studioillinois,
    href: 'https://games.illinois.edu/',
    tag: 'Professional Project',
  },
  {
    label: 'XR + AI Software Developer',
    title: 'Difficult Conversation Simulator',
    image: studioillinois,
    href: 'https://games.illinois.edu/',
    tag: 'Professional Project',
  },
  {
    label: 'AR Software Developer',
    title: 'Democracy AR',
    image: studioillinois,
    href: 'https://games.illinois.edu/',
    tag: 'Professional Project',
  },
  {
    label: 'Medical Simulation & AI Engineer',
    title: 'Accute Respiratory Distress Simulation',
    image: jumpCenter,
    href: 'https://medicine.illinois.edu/innovation/jumpsimulationcenter',
    tag: 'Professional Project',
  },
  {
    label: 'Medical Simulation & AI Engineer',
    title: 'Lumbar Puncture Virtual Trainer',
    image: jumpCenter,
    href: 'https://medicine.illinois.edu/innovation/jumpsimulationcenter',
    tag: 'Professional Project',
  },
]
