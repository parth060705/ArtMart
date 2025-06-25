import React from "react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-[var(--card)] bg-[var(--background)] text-[var(--foreground)] font-sans"
      style={{ fontFamily: 'Poppins' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left: Logo & Name */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
          <img src="/logo192.png" alt="ArtMart Logo" className="w-10 h-10 rounded-lg bg-[var(--primary)] p-1 shadow" />
          <span className="text-2xl font-bold tracking-tight" style={{fontFamily:'Poppins'}}>ArtMart</span>
        </div>
        {/* Center: Social Media Icons */}
        <div className="flex gap-6 justify-center w-full md:w-auto">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-[var(--card)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors shadow">
            <Instagram size={22} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-[var(--card)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors shadow">
            <Twitter size={22} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full bg-[var(--card)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors shadow">
            <Linkedin size={22} />
          </a>
        </div>
        {/* Right: Page Links */}
        <nav className="flex flex-wrap gap-4 justify-center w-full md:w-auto">
          <a href="/about" className="text-base hover:text-[var(--primary)] transition-colors font-medium">About</a>
          <a href="/contact" className="text-base hover:text-[var(--primary)] transition-colors font-medium">Contact</a>
          <a href="/terms" className="text-base hover:text-[var(--primary)] transition-colors font-medium">Terms</a>
          <a href="/privacy" className="text-base hover:text-[var(--primary)] transition-colors font-medium">Privacy</a>
          <a href="/help" className="text-base hover:text-[var(--primary)] transition-colors font-medium">Help</a>
        </nav>
      </div>
      <div className="text-center text-xs text-muted-foreground py-3 bg-[var(--background)] border-t border-[var(--card)] opacity-80">
        © {new Date().getFullYear()} ArtMart. All rights reserved.
      </div>
    </footer>
  );
}
