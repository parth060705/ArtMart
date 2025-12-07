import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogFooter from '@/components/blog/BlogFooter'
import { loadAllPosts } from '@/blog/store'

const BlogList: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BlogHeader variant="default" />
      <Seo
        title="Auroraa Blog - Learn, Grow & Discover as an Artist"
        description="Auroraa's blog shares tips, guides and stories to help artists grow, find clients, protect their art and build a community."
        og={{ title: 'Auroraa Blog - Learn, Grow & Discover as an Artist', description: "Auroraa's blog shares tips, guides and stories to help artists grow, find clients, protect their art and build a community.", type: 'website', url: 'https://auroraa.in/blog' }}
        canonical="https://auroraa.in/blog"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <input
            className="sm:col-span-2 w-full rounded-xl bg-card px-4 py-3 text-foreground placeholder-foreground/40 ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search posts (coming soon)"
          />
        </section> */}

        <section className="grid gap-6 sm:grid-cols-2">
          {loadAllPosts().map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="block overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
                    {post.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-foreground/60">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                  {(post.readingTime || '').trim() && <span>•</span>}
                  {post.readingTime && <span>{post.readingTime}</span>}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <BlogFooter />
    </main>
  )
}

export default BlogList
