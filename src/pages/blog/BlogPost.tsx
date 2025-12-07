import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useParams, Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogFooter from '@/components/blog/BlogFooter'
import { getPostBySlug } from '@/blog/store'
import { Share2 } from 'lucide-react'

const SITE_URL = 'https://auroraa.in'

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <BlogHeader variant="compact" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <p className="mt-2 text-foreground/80">We couldn't find that article.</p>
          <Link to="/blog" className="mt-6 inline-block text-accent hover:opacity-90">← Back to all posts</Link>
        </div>
      </main>
    )
  }

  const url = `${SITE_URL}/blog/${post.slug}`
  const md = post.md
  const handleShare = async () => {
    const shareData = {
      title: `${post.title} - Auroraa Blog`,
      text: post.description,
      url,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        // noop
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied')
      } catch (e) {
        window.prompt('Copy this link:', url)
      }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <Seo
        title={`${post.title} - Auroraa Blog`}
        description={post.description}
        og={{ title: `${post.title} - Auroraa Blog`, description: post.description, type: 'article', url }}
        canonical={url}
      />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-4">
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-2 text-foreground/80">{post.description}</div>
          <div className="mt-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm ring-1 ring-border hover:bg-accent/10"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
          {/* <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                {tag}
              </span>
            ))}
          </div> */}
        </header>

        <div className=" overflow-hidden rounded-xl ring-1 ring-border mb-4">
          <img
            src={post.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop'}
            alt={post.title}
            className="w-full h-56 sm:h-64 md:h-80"
            loading="eager"
          />
        </div>

        <section className="prose prose-invert prose-p:text-foreground/90 prose-headings:text-foreground prose-li:text-foreground/90 prose-ul:marker:text-foreground/60 prose-ol:marker:text-foreground/60 prose-strong:text-foreground prose-strong:font-bold max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {md}
          </ReactMarkdown>
        </section>

        <section className="mt-12 rounded-2xl bg-card ring-1 ring-border p-6">
          <h2 className="text-2xl font-semibold">Share your voice: 2‑min Auroraa survey</h2>
          <p className="mt-2 text-foreground/80">
            Help us build tools artists truly need. Your feedback guides our roadmap.
          </p>
          <a
            href="https://forms.gle/your-google-form-id"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow hover:opacity-95"
          >
            Take the short survey
          </a>
        </section>

        <div className="mt-10">
          <Link to="/blog" className="text-accent hover:opacity-90">← Back to all posts</Link>
        </div>

        <section className="mt-10 rounded-2xl bg-card ring-1 ring-border p-6">
          <h3 className="text-xl font-semibold">Create with Auroraa</h3>
          <p className="mt-2 text-foreground/80">Join a platform designed for artists. Upload your art, get discovered and grow your audience.</p>
          <Link to="/upload" className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow hover:opacity-95">
            Get started
          </Link>
        </section>
      </article>
      <BlogFooter />
    </main>
  )
}

export default BlogPost
