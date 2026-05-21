import {useMemo, useState} from 'react'
import {loadAllStories} from '@/utils/markdown'
import type {Story} from '@/types/story'

// Load once at module level — synchronous, build-time resolved
const ALL_STORIES: Story[] = loadAllStories()

export function useAllStories(): Story[] {
  return ALL_STORIES
}

export function useStory(slug: string): Story | undefined {
  return ALL_STORIES.find((s) => s.slug === slug)
}

export function useFilteredStories() {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const s of ALL_STORIES) {
      for (const t of s.tags) tagSet.add(t)
    }
    return [...tagSet].sort()
  }, [])

  const filtered = useMemo(() => {
    return ALL_STORIES.filter((s) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      const matchTags =
        selectedTags.length === 0 || selectedTags.every((t) => s.tags.includes(t))
      return matchSearch && matchTags
    })
  }, [search, selectedTags])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleTag = (tag: string) => {
    setPage(1)
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  const handleSetSearch = (v: string) => {
    setPage(1)
    setSearch(v)
  }

  return {
    stories: paged,
    total: filtered.length,
    search,
    setSearch: handleSetSearch,
    allTags,
    selectedTags,
    toggleTag,
    page,
    setPage,
    totalPages,
    PAGE_SIZE,
  }
}
