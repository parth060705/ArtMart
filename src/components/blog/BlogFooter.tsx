import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube } from 'lucide-react'

const BlogFooter: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-lg font-semibold">Auroraa</h4>
            <p className="mt-2 text-sm text-foreground/70">
              A platform for artists to share, sell and grow their creative careers.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/auroraadotin"
                target="_blank"
                rel="noreferrer"
                aria-label="Auroraa on Instagram"
                className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
                target="_blank"
                rel="noreferrer"
                aria-label="Auroraa on Facebook"
                className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@AuroraaCommunity"
                target="_blank"
                rel="noreferrer"
                aria-label="Auroraa on YouTube"
                className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-semibold">Explore</h5>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/blog" className="text-foreground/70 hover:text-foreground">Blog Home</Link></li>
              <li><Link to="/products" className="text-foreground/70 hover:text-foreground">Discover Art</Link></li>
              <li><Link to="/artists-ranking" className="text-foreground/70 hover:text-foreground">Top Artists</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold">Get involved</h5>
            <Link to="/upload" className="mt-4 inline-flex rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
              Upload your art
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-foreground/60">
          <p>© {new Date().getFullYear()} Auroraa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default BlogFooter
