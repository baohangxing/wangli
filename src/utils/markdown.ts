import type {Story} from '@/types/story'

/** Parse YAML-like frontmatter from a raw markdown string */
function parseFrontmatter(raw: string): {data: Record<string, unknown>; content: string} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return {data: {}, content: raw}

  const yamlStr = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      // Inline array: [tag1, tag2]
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }

  return {data, content}
}

// Eagerly load all story markdown files at build time
const rawModules = import.meta.glob('../../story/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function loadAllStories(): Story[] {
  const stories: Story[] = []

  for (const [path, raw] of Object.entries(rawModules)) {
    const filename = path.split('/').pop()!
    const slug = filename.replace(/\.md$/, '')
    const {data, content} = parseFrontmatter(raw)

    stories.push({
      slug,
      title: (data['title'] as string) || slug,
      date: (data['date'] as string) || '',
      tags: (data['tags'] as string[]) || [],
      description: (data['description'] as string) || '',
      content,
    })
  }

  // Sort newest first
  return stories.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
