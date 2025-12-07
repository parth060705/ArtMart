import React, { useEffect } from 'react'

interface SeoProps {
  title?: string
  description?: string
  og?: {
    title?: string
    description?: string
    type?: string
    url?: string
  }
  canonical?: string
}

function upsertMeta(name: string, content: string) {
  if (!content) return
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertProperty(property: string, content: string) {
  if (!content) return
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  if (!href) return
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export const Seo: React.FC<SeoProps> = ({ title, description, og, canonical }) => {
  useEffect(() => {
    if (title) document.title = title
    if (description) upsertMeta('description', description)
    if (og?.title) upsertProperty('og:title', og.title)
    if (og?.description) upsertProperty('og:description', og.description)
    if (og?.type) upsertProperty('og:type', og.type)
    if (og?.url) upsertProperty('og:url', og.url)
    if (canonical) upsertCanonical(canonical)
  }, [title, description, og?.title, og?.description, og?.type, og?.url, canonical])

  return null
}

export default Seo
