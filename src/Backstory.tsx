import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ScrollNav } from './ScrollNav'
import rayan3 from './assets/Rayan3.png'
import rayanForest from './assets/RayanGhosh3.jpg'
import rayanSelfie from './assets/RayanSelfie.jpeg'
import rayanArt from './assets/art2.jpg'
import gamedev from './assets/AHS Game Dev.png'
import interview from './assets/EagleQuest.png'
import UIUC from './assets/UIUC.jpeg'
import mindlockPresentation from './assets/m2.png'
import jumpCenter from './assets/MedicalSimulationDesign.jpg'

import { NavButton } from './NavButton'

const cheezeIconSrc = `${import.meta.env.BASE_URL}cheezeIcon.svg`

type BackstoryParagraph = string | 'cheeze-icon'

type BackstoryPageProps = {
  onBack: () => void
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
  onCatalog: () => void
}

type BackstoryRow = {
  hasImage: boolean
  label: string
  image?: { src: string; alt: string }
  imageBottomSpace?: number
  heading?: string
  paragraphs: BackstoryParagraph[]
}

type Point = { x: number; y: number }

type JourneyNodeRef = (element: HTMLElement | null) => void

const BACKSTORY_ROWS: BackstoryRow[] = [
  {
    hasImage: true,
    label: 'Introduction',
    image: {
      src: rayanSelfie,
      alt: '',
    },
    imageBottomSpace: 0,
    heading: 'Hello! My name is Rayan Ghosh...',
    paragraphs: [
      'and this my story so far!',
      'Creating interactive software has always been a life long passion of mine, so I\'d like to start from the very beginning.',
      'Thank you for visiting my website!',
      'cheeze-icon',
    ],
  },
  {
    hasImage: true,
    label: 'Early roots',
    image: {
      src: rayanArt,
      alt: '',
    },
    imageBottomSpace: 0,
    heading: 'The year is 2020...',
    paragraphs: [
      'and the pandemic was in full effect. I had always been interested in learning how to create video games, but had never given it a try. So, with all the new free time I suddenly found myself with, I decided to give it a try!',
      'I had no idea what I was about to begin would spark a life long passion.',
    ],
  },
  {
    hasImage: true,
    label: 'First Game',
    image: {
      src: rayan3,
      alt: '',
    },
    imageBottomSpace: 0,
    heading: 'My first game…',
    paragraphs: [
      'was made in 48 hours during the GMTK Game Jam 2020, and it was terrible.',
      'The game was barely playable, and I had somehow reworked the jumping mechanic into a flying simulation since I didn’t know how to check if the player was grounded!',
      'But the response from the community introduced me to implementing user feedback from an early age, and it motivated me to continue perfecting my craft.',
    ],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: rayanForest,
      alt: '',
    },
    imageBottomSpace: 0,
    heading: 'My creative and technical obsession...',
    paragraphs: [
      'with game development grew day by day, night by night, as I spent every spare moment outside of my studies making games.',
      'To me, it is the ultimate art form: a beautiful harmony of art, programming, sound design, and music combined into one cohesive experience.',
      'I constantly pushed my boundaries by setting small deadlines like making games for my friend’s birthdays and participating in game jams over the years. This cycle of creating and refining allowed me to master my craft and learn everything I needed to know about bringing interactive experiences to life. ',
    ],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: gamedev,
      alt: 'Our club is still going strong today, with over 150 members!',
    },
    imageBottomSpace: 0,
    heading: 'Game development became more than just a hobby…',
    paragraphs: [
      'It became my creative outlet into the world, a medium for which to express my ideas.', 
      'I wanted my peers to understand how liberating it felt to create interactive experiences, so I founded a game development club at my school. I held meetings weekly covering the basics of the Unity Game Engine and the fundamentals of C#, giving students at my school the tools to realize their own creative visions.',
      'Together, we created 7 unique games over the span of 3 years.'],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: interview,
      alt: 'Picture from an interview I did with my school\'s social media team.',
    },
    imageBottomSpace: 0,
    heading: 'After founding my club...',
    paragraphs: [
      'I realized my passion for teaching. This lead me to become an instructor at the CS First Club and the Coding Tomorrow Initiative in my community. I also joined Instilt, an NGO focused on tutoring English to underprivileged children in around the world. Teaching at Instilt was an extremely fulfilling experience, and it made me realize that I wanted to pursue education through technology.',
    ],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: UIUC,
      alt: 'Picture with a statue outside the Main Library at UIUC.',
    },
    imageBottomSpace: 0,
    heading: 'Which was why...',
    paragraphs: [
      'I decided to major in Computer Science + Education at the University of Illinois at Urbana-Champaign! ',
      'It combines my greatest passions, as it allows me to take courses which discuss the intersection of the two fields. What I discovered was that my expertise in game development was actually fundamental in designing educational software.',
      'Truly effective learning tools need to be fun and engaging, and utilize gamification techniques to keep students engaged and motivated.',
      'But my pursuits at UIUC go far beyond just my regular coursework.'
    ],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: mindlockPresentation,
      alt: 'Presenting my team\'s project at the GameBuilders Final Showcase!',
    },
    imageBottomSpace: 0,
    heading: 'Utilizing my experience...',
    paragraphs: [
      'in game development, I led two game development teams with ACM GameBuilders!' ,
      'Collaborating with my teammates while integrating a game development curriculum into our development cycle was a challenging yet rewarding experience.',
      'I learned to balance my time between my coursework and my projects, and how to effectively communicate with my teammates to ensure our games were effectively polished and ready for our final showcases.',
    ],
  },
  {
    hasImage: true,
    label: 'Growing Better at Games',
    image: {
      src: jumpCenter,
      alt: 'Working on the Accurate Respiratory Distress Simulation at the Jump Center!',
    },
    imageBottomSpace: 0,
    heading: 'I also learned that...',
    paragraphs: [
      'my game development skills could actually be applied to solve real world problems!',
      'I currently work at the stu/dio: a game development organization on campus that works with sponsors to release high fidelity simulations and XR experiences tailored toward education!',
      'I also work at the Jump Simulation Center, which works directly with the Carle College of Medicine to create high fidelity simulations for medical students to practice with!',
      'Developing these simulations have taught me so much about the importance of user feedback and iterative development, as well as developing XR applications integrated with AI systems.',
      'Thank you for reading my story so far!',
      'Feel free to explore my project catalog to try out some of my projects!',
    ],
  },
]

// Node ids are `${index}-text` and `${index}-image`

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const onChange = () => setMatches(mediaQuery.matches)

    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [query])

  return matches
}

function getGutterEdgeAnchor(
  element: HTMLElement,
  containerRect: DOMRect,
  gutterX: number,
): Point {
  const rect = element.getBoundingClientRect()
  const left = rect.left - containerRect.left
  const right = rect.right - containerRect.left
  const centerX = (left + right) / 2

  return {
    x: centerX <= gutterX ? right : left,
    y: (rect.top + rect.bottom) / 2 - containerRect.top,
  }
}

function getRowGutterPoint(
  rowIndex: number,
  nodeMap: Map<string, HTMLElement>,
  container: HTMLElement,
  containerRect: DOMRect,
  gutterX: number,
): Point | null {
  const elements = [`${rowIndex}-image`, `${rowIndex}-text`]
    .map((id) => nodeMap.get(id))
    .filter((element): element is HTMLElement => !!element && container.contains(element))

  if (!elements.length) {
    return null
  }

  const rects = elements.map((element) => element.getBoundingClientRect())
  const top = Math.min(...rects.map((rect) => rect.top)) - containerRect.top
  const bottom = Math.max(...rects.map((rect) => rect.bottom)) - containerRect.top

  return {
    x: gutterX + (rowIndex % 2 === 0 ? -26 : 26),
    y: (top + bottom) / 2,
  }
}

function buildTimelineAnchors(
  nodeMap: Map<string, HTMLElement>,
  container: HTMLElement,
  containerRect: DOMRect,
  gutterX: number,
): Point[] {
  const anchors: Point[] = []

  const firstText = nodeMap.get('0-text')
  if (firstText && container.contains(firstText)) {
    anchors.push(getGutterEdgeAnchor(firstText, containerRect, gutterX))
  }

  const introRowPoint = getRowGutterPoint(0, nodeMap, container, containerRect, gutterX)
  if (introRowPoint) {
    anchors.push(introRowPoint)
  }

  for (let rowIndex = 1; rowIndex < BACKSTORY_ROWS.length; rowIndex += 1) {
    const rowPoint = getRowGutterPoint(rowIndex, nodeMap, container, containerRect, gutterX)
    if (rowPoint) {
      anchors.push(rowPoint)
    }
  }

  return anchors
}

function catmullRomPath(points: Point[], tension = 0.72): string {
  if (points.length < 2) {
    return points.length === 1
      ? `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
      : ''
  }

  const format = (value: number) => value.toFixed(1)
  let path = `M ${format(points[0].x)} ${format(points[0].y)}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const point0 = points[Math.max(index - 1, 0)]
    const point1 = points[index]
    const point2 = points[index + 1]
    const point3 = points[Math.min(index + 2, points.length - 1)]

    const control1 = {
      x: point1.x + ((point2.x - point0.x) / 6) * tension,
      y: point1.y + ((point2.y - point0.y) / 6) * tension,
    }
    const control2 = {
      x: point2.x - ((point3.x - point1.x) / 6) * tension,
      y: point2.y - ((point3.y - point1.y) / 6) * tension,
    }

    path += ` C ${format(control1.x)} ${format(control1.y)}, ${format(control2.x)} ${format(control2.y)}, ${format(point2.x)} ${format(point2.y)}`
  }

  return path
}

function buildJourneyPath(anchors: Point[]): string {
  return catmullRomPath(anchors)
}

function BackstoryJourneyArrow({
  containerRef,
  nodeMapRef,
  layoutVersion,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  nodeMapRef: React.RefObject<Map<string, HTMLElement>>
  layoutVersion: number
}) {
  const [path, setPath] = useState('')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [visible, setVisible] = useState(false)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [pathLength, setPathLength] = useState<number | null>(null)
  const mainPathRef = useRef<SVGPathElement | null>(null)
  const glowPathRef = useRef<SVGPathElement | null>(null)

  const journeyDelayMs = 600
  const journeyDurationMs = 10000
  const fadeInDurationMs = 1100

  const updatePath = useCallback(() => {
    const container = containerRef.current
    const nodeMap = nodeMapRef.current
    if (!container || !nodeMap) {
      return
    }

    setVisible(true)
    setStartPoint(null)

    const containerRect = container.getBoundingClientRect()
    const containerWidth = container.offsetWidth
    const gutterX = containerWidth * 0.5

    const nodes = Array.from(nodeMap.entries())
      .map(([id, element]) => ({ id, element }))
      .filter(({ element }) => container.contains(element))

    if (nodes.length < 2) {
      setPath('')
      setStartPoint(null)
      return
    }

    const orderedAnchors = buildTimelineAnchors(
      nodeMap,
      container,
      containerRect,
      gutterX,
    )

    if (orderedAnchors.length < 2) {
      setPath('')
      setStartPoint(null)
      return
    }

    setDimensions({
      width: containerWidth,
      height: container.offsetHeight,
    })
    const newPath = buildJourneyPath(orderedAnchors)
    setPath(newPath)
    setStartPoint(orderedAnchors[0] ?? null)
  }, [containerRef, nodeMapRef])

  useLayoutEffect(() => {
    updatePath()

    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const resizeObserver = new ResizeObserver(updatePath)
    resizeObserver.observe(container)

    const nodeMap = nodeMapRef.current
    if (nodeMap) {
      nodeMap.forEach((element) => resizeObserver.observe(element))
    }

    window.addEventListener('resize', updatePath)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updatePath)
    }
  }, [containerRef, nodeMapRef, updatePath, layoutVersion])

  useLayoutEffect(() => {
    if (!path) {
      setPathLength(null)
      return
    }

    const length = mainPathRef.current?.getTotalLength()
    if (!length || !Number.isFinite(length)) {
      setPathLength(null)
      return
    }

    setPathLength(length)
  }, [path, layoutVersion])

  if (!visible || !path || dimensions.width === 0) {
    return null
  }

  return (
    <svg
      className="backstory-journey-arrow"
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      aria-hidden="true"
      style={
        {
          ['--journey-delay-ms' as string]: `${journeyDelayMs + fadeInDurationMs}ms`,
          ['--journey-duration-ms' as string]: `${journeyDurationMs}ms`,
          ['--journey-dash' as string]: pathLength ? `${pathLength}` : '0',
        } as React.CSSProperties
      }
    >
      <defs>
        <marker
          id="backstory-journey-arrowhead"
          markerWidth="20"
          markerHeight="20"
          refX="6"
          refY="10"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,0 L20,10 L0,20 Z" className="backstory-journey-arrowhead" />
        </marker>
      </defs>
      {startPoint ? (
        <>
          <circle className="backstory-journey-start-dot backstory-journey-start-dot--glow" cx={startPoint.x} cy={startPoint.y} r={14} />
          <circle className="backstory-journey-start-dot" cx={startPoint.x} cy={startPoint.y} r={8} />
        </>
      ) : null}
      <path
        ref={glowPathRef}
        className="backstory-journey-arrow-path backstory-journey-arrow-path--glow backstory-journey-arrow-path--animated"
        d={path}
      />
      <path
        ref={mainPathRef}
        className="backstory-journey-arrow-path backstory-journey-arrow-path--animated"
        d={path}
        markerEnd="url(#backstory-journey-arrowhead)"
      />
    </svg>
  )
}

function BackstoryTextCard({
  heading,
  paragraphs,
  label,
  nodeRef,
}: Pick<BackstoryRow, 'heading' | 'paragraphs' | 'label'> & { nodeRef?: JourneyNodeRef }) {
  return (
    <article
      ref={nodeRef}
      className="about-card backstory-text-card backstory-journey-node"
      aria-label={label}
    >
      {heading ? <h2>{heading}</h2> : null}
      {paragraphs.map((paragraph, index) =>
        paragraph === 'cheeze-icon' ? (
          <p key={`${label}-${index}`} className="backstory-cheeze-icon-wrap">
            <img
              className="backstory-cheeze-icon"
              src={cheezeIconSrc}
              alt=""
              aria-hidden="true"
            />
          </p>
        ) : (
          <p key={`${label}-${index}`}>{paragraph}</p>
        ),
      )}
    </article>
  )
}

function BackstoryImageCard({
  src,
  alt,
  label,
  nodeRef,
  onImageLoad,
  bottomSpace,
}: NonNullable<BackstoryRow['image']> & {
  label: string
  nodeRef?: JourneyNodeRef
  onImageLoad?: () => void
  bottomSpace?: number
}) {
  const caption = alt.trim()

  return (
    <figure
      ref={nodeRef}
      className="about-card backstory-media-card backstory-journey-node"
      aria-label={label}
      style={bottomSpace ? { marginBottom: bottomSpace } : undefined}
    >
      <div className="backstory-media-frame">
        <img src={src} alt={caption || label} loading="lazy" decoding="async" onLoad={onImageLoad} />
        {caption ? <figcaption className="backstory-media-caption">{caption}</figcaption> : null}
      </div>
    </figure>
  )
}

function BackstoryPair({
  row,
  index,
  registerNode,
  onImageLoad,
}: {
  row: BackstoryRow
  index: number
  registerNode: (id: string) => JourneyNodeRef
  onImageLoad?: () => void
}) {
  const nodeKey = `${index}`

  return (
    <>
      {row.hasImage && row.image ? (
        <BackstoryImageCard
          {...row.image}
          nodeRef={registerNode(`${nodeKey}-image`)}
          label={row.label}
          onImageLoad={onImageLoad}
        />
      ) : null}
      <BackstoryTextCard
        nodeRef={registerNode(`${nodeKey}-text`)}
        label={row.label}
        heading={row.heading}
        paragraphs={row.paragraphs}
      />
    </>
  )
}

function renderPrimaryColumnItem(
  row: BackstoryRow,
  index: number,
  registerNode: (id: string) => JourneyNodeRef,
  onImageLoad?: () => void,
) {
  const imageOnLeft = index % 2 === 0

  if (imageOnLeft && row.hasImage && row.image) {
    return (
      <BackstoryImageCard
        key={`${index}-image`}
        {...row.image}
        nodeRef={registerNode(`${index}-image`)}
        label={row.label}
        onImageLoad={onImageLoad}
        bottomSpace={row.imageBottomSpace}
      />
    )
  }

  if (!imageOnLeft) {
    return (
      <BackstoryTextCard
        key={`${index}-text`}
        nodeRef={registerNode(`${index}-text`)}
        label={row.label}
        heading={row.heading}
        paragraphs={row.paragraphs}
      />
    )
  }

  return null
}

function renderSecondaryColumnItem(
  row: BackstoryRow,
  index: number,
  registerNode: (id: string) => JourneyNodeRef,
  onImageLoad?: () => void,
) {
  const imageOnLeft = index % 2 === 0

  if (imageOnLeft) {
    return (
      <BackstoryTextCard
        key={`${index}-text`}
        nodeRef={registerNode(`${index}-text`)}
        label={row.label}
        heading={row.heading}
        paragraphs={row.paragraphs}
      />
    )
  }

  if (row.hasImage && row.image) {
    return (
      <BackstoryImageCard
        key={`${index}-image`}
        {...row.image}
        nodeRef={registerNode(`${index}-image`)}
        label={row.label}
        onImageLoad={onImageLoad}
        bottomSpace={row.imageBottomSpace}
      />
    )
  }

  return null
}

export function BackstoryPage({
  onHome,
  onExperience,
  onAbout,
  onCatalog,
}: BackstoryPageProps) {
  const journeyRef = useRef<HTMLDivElement>(null)
  const nodeMapRef = useRef<Map<string, HTMLElement>>(new Map())
  const [layoutVersion, setLayoutVersion] = useState(0)
  const showColumns = useMediaQuery('(min-width: 760px)')

  const registerNode = useCallback((id: string): JourneyNodeRef => {
    return (element) => {
      if (element) {
        nodeMapRef.current.set(id, element)
      } else {
        nodeMapRef.current.delete(id)
      }
    }
  }, [])

  const handleImageLoad = useCallback(() => {
    setLayoutVersion((version) => version + 1)
  }, [])

  useEffect(() => {
    nodeMapRef.current.clear()
    setLayoutVersion((version) => version + 1)
  }, [showColumns])

  return (
    <>
      <ScrollNav
        visible
        onHome={onHome}
        onExperience={onExperience}
        onAbout={onAbout}
        onCatalog={onCatalog}
      />
      <main
        className="experience-page backstory-page backstory-page--with-nav"
        aria-labelledby="backstory-title"
      >
        <section className="experience-shell backstory-shell">
          <header className="experience-header">
            <h1 id="backstory-title" className="experience-title">
              MY JOURNEY
            </h1>
          </header>

          <div className="backstory-content">
            {showColumns ? (
              <div ref={journeyRef} className="backstory-columns" aria-label="My journey">
                <div className="backstory-column backstory-column--primary">
                  {BACKSTORY_ROWS.map((row, index) =>
                    renderPrimaryColumnItem(row, index, registerNode, handleImageLoad),
                  )}
                </div>
                <div className="backstory-column backstory-column--secondary">
                  {BACKSTORY_ROWS.map((row, index) =>
                    renderSecondaryColumnItem(row, index, registerNode, handleImageLoad),
                  )}
                </div>
                <BackstoryJourneyArrow
                  containerRef={journeyRef}
                  nodeMapRef={nodeMapRef}
                  layoutVersion={layoutVersion}
                />
              </div>
            ) : (
              <div ref={journeyRef} className="backstory-stack" aria-label="My journey">
                {BACKSTORY_ROWS.map((row, index) => (
                  <section
                    key={`backstory-${index}`}
                    className="backstory-stack-pair"
                    aria-label={row.label}
                  >
                    <BackstoryPair
                      row={row}
                      index={index}
                      registerNode={registerNode}
                      onImageLoad={handleImageLoad}
                    />
                  </section>
                ))}
              </div>
            )}

            <nav
              className="nav-panel backstory-catalog-nav"
              aria-label="Catalog navigation"
            >
              <p className="backstory-catalog-nav__copy">
                FIND ALL OF MY PROJECTS MADE THROUGHOUT MY JOURNEY HERE!
              </p>
              <NavButton onClick={onCatalog} href="#/catalog">
                CATALOG SEARCH
              </NavButton>
            </nav>
          </div>
        </section>
      </main>
    </>
  )
}
