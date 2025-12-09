import React from 'react'
import { Link } from 'react-router-dom'

interface BlogHeaderProps {
  variant?: 'default' | 'compact'
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ variant = 'default' }) => {
  const isCompact = variant === 'compact'
  return (
    <header className={
      [
        'w-full border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isCompact ? 'py-4' : 'py-8'
      ].join(' ')
    }>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div>
          <Link to="/blog" className="block">
            <h1 className={['font-bold tracking-tight', isCompact ? 'text-2xl' : 'text-4xl'].join(' ')}>
              Auroraa Blog
            </h1>
          </Link>
          {!isCompact && (
            <p className="mt-2 text-foreground/70">
              Stories, insights & guides for artists
            </p>
          )}
        </div>
        <nav className="hidden sm:flex items-center gap-3 text-sm">
          <Link to="/" className="text-foreground/70 hover:text-foreground">Home</Link>
          <span className="text-foreground/30">·</span>
          <Link to="/products" className="text-foreground/70 hover:text-foreground">Discover</Link>
          <span className="text-foreground/30">·</span>
          <Link to="/artists-ranking" className="text-foreground/70 hover:text-foreground">Artists</Link>
        </nav>
      </div>
    </header>
  )
}

export default BlogHeader
