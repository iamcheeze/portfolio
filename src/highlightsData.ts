import citrusBeatdownThumbnail from './assets/CitrusBeatdownThumbnail.png'
import DCS from './assets/DCS.png'
import JumpPromoImage1 from './assets/ARDSThumbnail.png'
import LPVT from './assets/LPVT.png'
import MindlockMuseumPromoImage2 from './assets/MindlockThumbnail.png'
import RedHighlight1 from './assets/RedThumbnail.jpg'

export type HighlightId =
  | 'ards'
  | 'mindlock'
  | 'paint-the-world-red'
  | 'lumbar-puncture'
  | 'difficult-conversation'
  | 'citrus-beatdown'

export type HighlightItem = {
  id: HighlightId
  hash: string
  title: string
  description: string
  subtitle: string
  image: string
  externalHref: string
}

export const highlightsData: HighlightItem[] = [
  {
    id: 'ards',
    hash: '#/acute-respiratory-distress',
    title: 'ACUTE RESPIRATORY DISTRESS SIMULATION',
    description:
      'I CREATED AN IMMERSIVE VITALS MONITOR AND VENTILATION SYSTEM FOR OUR VIRTUAL PATIENT, WHICH WE THEN VALIDATED THROUGH USER TESTING AND FEEDBACK WITH 65 M1 MEDICAL STUDENTS!',
    subtitle: 'PROFESSIONAL EXPERIENCE',
    image: JumpPromoImage1,
    externalHref: 'https://medicine.illinois.edu/innovation/jumpsimulationcenter',
  },
  {
    id: 'lumbar-puncture',
    hash: '#/lumbar-puncture-virtual-trainer',
    title: 'LUMBAR PUNCTURE VIRTUAL TRAINER',
    description:
      'I ENGINEERED AN INTERACTIVE 3D RENDERING SYSTEM IN THE LUMBAR PUNCTURE VIRTUAL TRAINER FOR MEDICAL TRAINING AT THE JUMP SIMULATION CENTER!',
    subtitle: 'PROFESSIONAL EXPERIENCE',
    image: LPVT,
    externalHref: 'https://medicine.illinois.edu/innovation/jumpsimulationcenter',
  },
  {
    id: 'difficult-conversation',
    hash: '#/difficult-conversation-simulator',
    title: 'DIFFICULT CONVERSATION SIMULATOR',
    description:
      'I BUILT AN XR CONVERSATION SIMULATOR INTEGRATED WITH AN LLM BACKEND TO CHOOSE CORRECT RESPONSES!',
    subtitle: 'PROFESSIONAL EXPERIENCE',
    image: DCS,
    externalHref: 'https://games.illinois.edu/',
  },
  {
    id: 'mindlock',
    hash: '#/mindlock-museum',
    title: 'MINDLOCK MUSEUM',
    description:
      'I lead and directed a 17 person team of software developers, 2D/3D artists, and UI/UX designers to create a mixed media detective game!',
    subtitle: 'LEADERSHIP EXPERIENCE',
    image: MindlockMuseumPromoImage2,
    externalHref: 'https://iamcheeze.itch.io/mindlock-museum',
  },
  {
    id: 'citrus-beatdown',
    hash: '#/citrus-beatdown',
    title: 'CITRUS BEATDOWN',
    description:
      'I CREATED A FAST-PACED FIRST-PERSON BEAT \'EM UP WITH TIGHT COMBAT MECHANICS AND POLISHED GAME FEEL, RELEASED ON ITCH.IO!',
    subtitle: 'PERSONAL PROJECT',
    image: citrusBeatdownThumbnail,
    externalHref: 'https://iamcheeze.itch.io/citrus-beatdown',
  },
  {
    id: 'paint-the-world-red',
    hash: '#/paint-the-world-red',
    title: 'PAINT THE WORLD RED',
    description:
      'I AM CREATING A NARRATIVE DRIVEN GAME THAT ALLOWS YOU TO TRAVERSE AN OPEN WORLD THROUGH A DYNAMIC COMBAT SYSTEM WHILE DOCUMENTING MY DEVELOPMENT ONLINE!',
    subtitle: 'PERSONAL PROJECT',
    image: RedHighlight1,
    externalHref: 'https://www.instagram.com/ptwredgame/',
  },
]

export function getHighlightById(id: HighlightId): HighlightItem | undefined {
  return highlightsData.find((item) => item.id === id)
}

export function getHighlightFromHash(hash: string): HighlightItem | undefined {
  return highlightsData.find((item) => item.hash === hash)
}

export function isHighlightId(page: string): page is HighlightId {
  return highlightsData.some((item) => item.id === page)
}
