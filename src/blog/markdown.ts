export interface Frontmatter {
  [key: string]: any
}

export function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  // Allow optional BOM and leading whitespace, and support CRLF line endings
  const fmMatch = /^(?:\uFEFF)?\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/m.exec(raw)
  if (!fmMatch) return { data: {}, content: raw }
  const [, fm, body] = fmMatch
  const data: Frontmatter = {}
  fm.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return
    const kv = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/)
    if (!kv) return
    const key = kv[1].trim()
    let value: any = kv[2].trim()
    // Strip quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    // Arrays: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v: string) => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    }
    data[key] = value
  })
  return { data, content: body }
}

export function markdownToHtml(md: string): string {
  let html = md

  // Escape HTML special chars first
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Fenced code blocks ```lang\n...\n```
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (_m, lang: string, code: string) => {
    const language = lang ? ` class="language-${lang}"` : ''
    // Keep code escaped
    return `<pre><code${language}>${code.replace(/\n/g, '\n')}</code></pre>`
  })

  // Headings ###, ##, #
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
  // Headings ####, #####, ######
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')

  // Blockquotes > quote
  html = html.replace(/^(?:>\s?.*(?:\n|$))+?/gm, (block) => {
    const inner = block
      .replace(/^>\s?/gm, '')
      .trim()
      .replace(/\n{2,}/g, '</p><p>')
    return `<blockquote><p>${inner}</p></blockquote>`
  })

  // Bold **text** and Italic *text*
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Also support underscores for emphasis
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

  // Images ![alt](url)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />')

  // Horizontal rules --- ___ ***
  html = html.replace(/^\s*(?:-{3,}|_{3,}|\*{3,})\s*$/gm, '<hr/>')

  // Auto-link bare URLs (simple heuristic)
  html = html.replace(/(?<!["'>])(https?:\/\/[^\s)]+)(?![^<]*>)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')

  // Unordered lists
  html = html.replace(/^(?:\s*[-*]\s+.*(?:\n|$))+?/gm, (block) => {
    const items = block
      .trim()
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*[-*]\s+/, ''))
      .map((text) => `<li>${text}</li>`) 
      .join('')
    return `<ul>${items}</ul>`
  })

  // Ordered lists
  html = html.replace(/^(?:\s*\d+\.\s+.*(?:\n|$))+?/gm, (block) => {
    const items = block
      .trim()
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*\d+\.\s+/, ''))
      .map((text) => `<li>${text}</li>`)
      .join('')
    return `<ol>${items}</ol>`
  })

  // Paragraphs: wrap lone lines not already converted
  html = html
    .split(/\r?\n\r?\n/)
    .map((chunk) => {
      if (/^\s*<h[1-6]|^\s*<ul|^\s*<p|^\s*<blockquote|^\s*<img|^\s*<pre|^\s*<code/i.test(chunk.trim())) {
        return chunk
      }
      return `<p>${chunk.replace(/\r?\n/g, '<br/>').trim()}</p>`
    })
    .join('\n')

  return html
}
