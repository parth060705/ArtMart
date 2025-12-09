import { parseFrontmatter } from './markdown'

export interface MarkdownPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
  image?: string
  md: string
}

// Eagerly import all markdown files as raw strings
const rawPosts = import.meta.glob('/src/blog/posts/*.md', { as: 'raw', eager: true }) as Record<string, string>

function fileSlug(filePath: string): string {
  const match = filePath.match(/([^\/]+)\.md$/)
  return match ? match[1] : filePath
}

const parsedPosts: MarkdownPost[] = Object.entries(rawPosts).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const slug = (data.slug as string) || fileSlug(path)
  const post: MarkdownPost = {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    date: (data.date as string) || new Date().toISOString(),
    tags: (data.tags as string[]) || [],
    readingTime: (data.readingTime as string) || '',
    image: (data.image as string) || undefined,
    md: content,
  }
  return post
})

// Sort by date desc
parsedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function loadAllPosts(): MarkdownPost[] {
  return parsedPosts
}

export function getPostBySlug(slug: string): MarkdownPost | undefined {
  return parsedPosts.find(p => p.slug === slug)
}
