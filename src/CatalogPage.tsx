import { useMemo, useState } from 'react'
import { CardButton } from './CardButton'
import { ScrollNav } from './ScrollNav'
import { projectItems, projectTags, type ProjectTag } from './projectItems'

type CatalogPageProps = {
  onHome: () => void
  onExperience: () => void
  onAbout: () => void
}

export function CatalogPage({ onHome, onExperience, onAbout }: CatalogPageProps) {
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
    <>
      <ScrollNav
        visible
        onHome={onHome}
        onExperience={onExperience}
        onAbout={onAbout}
        onCatalog={() => {}}
      />
      <main className="catalog-page catalog-page--with-nav" aria-labelledby="catalog-title">
        <section className="catalog-shell catalog-shell--intro">
          <header className="catalog-header catalog-intro catalog-intro--title">
            <h1 id="catalog-title" className="experience-title">
              PROJECT CATALOG
            </h1>
          </header>

          <div className="catalog-filter-bar catalog-intro catalog-intro--filters">
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

          <p
            className="catalog-result-count catalog-intro catalog-intro--count"
            id="catalog-result-count"
            aria-live="polite"
          >
            {filteredProjects.length} {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </p>

          {filteredProjects.length > 0 ? (
            <div className="catalog-grid catalog-intro catalog-intro--grid">
              {filteredProjects.map((item, index) => (
                <CardButton
                  key={item.title}
                  href={item.href}
                  image={item.image}
                  label={item.label}
                  title={item.title}
                  className="catalog-item"
                  style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
                />
              ))}
            </div>
          ) : (
            <p className="catalog-empty catalog-intro catalog-intro--empty">NO PROJECTS FOUND</p>
          )}
        </section>
      </main>
    </>
  )
}
