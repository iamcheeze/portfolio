import { useMemo, useState } from 'react'
import { CardButton } from './CardButton'
import { NavButton } from './NavButton'
import { projectItems, projectTags, type ProjectTag } from './projectItems'

type CatalogPageProps = {
  onBack: () => void
}

export function CatalogPage({ onBack }: CatalogPageProps) {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<ProjectTag | 'All Projects'>('All Projects')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProjects = useMemo(() => {
    return projectItems.filter((item) => {
      const matchesQuery = !normalizedQuery || item.title.toLowerCase().includes(normalizedQuery)
      const matchesTag = selectedTag === 'All Projects' || item.tag === selectedTag

      return matchesQuery && matchesTag
    })
  }, [normalizedQuery, selectedTag])

  return (
    <main className="catalog-page" aria-labelledby="catalog-title">
      <div className="experience-glow" aria-hidden="true" />

      <section className="catalog-shell">
        <header className="catalog-header">
          <h1 id="catalog-title" className="experience-title">
            PROJECT CATALOG
          </h1>
        </header>

        <div className="catalog-filter-bar">
          <label className="catalog-search">
            <span className="catalog-search-label">SEARCH PROJECT TITLES</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for projects..."
              aria-describedby="catalog-result-count"
            />
          </label>

          <label className="catalog-search catalog-tag-filter">
            <span className="catalog-search-label">FILTER BY TAG</span>
            <select
              value={selectedTag}
              onChange={(event) => setSelectedTag(event.target.value as ProjectTag | 'All Projects')}
              aria-describedby="catalog-result-count"
            >
              <option value="All Projects">All Projects</option>
              {projectTags.map((tag) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="catalog-result-count" id="catalog-result-count" aria-live="polite">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="catalog-grid">
            {filteredProjects.map((item) => (
              <CardButton
                key={item.title}
                href={item.href}
                image={item.image}
                label={item.label}
                title={item.title}
              />
            ))}
          </div>
        ) : (
          <p className="catalog-empty">NO PROJECTS FOUND</p>
        )}

        <nav className="nav-panel experience-nav" aria-label="Catalog navigation">
          <NavButton onClick={onBack} href="#/experience">
            BACK
          </NavButton>
        </nav>
      </section>
    </main>
  )
}
