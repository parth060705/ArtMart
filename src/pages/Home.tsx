// src/pages/Home.jsx
import React, { useState } from 'react';
import AvatarSlider from '@/components/AvatarSlider';
import ModernHashtagSlider from '@/components/ModernHashtagSlider';
import SocialTestimonial from '@/components/SocialTestimonial';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import MasonryFeed from '@/components/MasonryFeed';

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="font-sans bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section with Auto Card Slider (side-by-side) */}
      <section className="relative w-full flex flex-col items-start justify-start py-24 px-4 md:px-16 bg-gradient-to-b from-[var(--background)] to-[var(--card)] gap-10 text-start">
        <div className="flex flex-col items-start z-10 text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight drop-shadow-lg" style={{ fontFamily: 'Poppins' }}>
            Discover, Collect & <br /> Share Artistry
          </h1>
          <p className="text-lg md:text-2xl max-w-xl mb-8 text-muted-foreground">
            India's handmade art & craft marketplace. Where artists meet admirers. Where every piece tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full md:w-auto mb-8">
            <Link to="/products" className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all text-lg font-semibold">
              Start Exploring
            </Link>
            <Link to="/auth/register" className="border border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-full hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all text-lg font-semibold">
              Join as Artist
            </Link>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
          <div className="absolute rounded-full bg-[var(--primary)] opacity-10 blur-3xl w-96 h-96 left-[-6rem] top-[-6rem] animate-pulse" />
          <div className="absolute rounded-full bg-[var(--primary)] opacity-10 blur-3xl w-72 h-72 right-[-4rem] bottom-[-4rem] animate-pulse" />
        </div>
      </section>

      {/* Hashtag Row */}
      {/* <section className="max-w-5xl mx-auto py-6 px-4">
        <ModernHashtagSlider />
      </section> */}

      {/* Community Avatar Slider */}
      {/* <section className="max-w-6xl mx-auto py-8 px-4">
        <AvatarSlider />
      </section> */}

      {/* Social-Style Feed Grid */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Poppins' }}>
          Social Feed Highlights
        </h2>
        <MasonryFeed className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full" length={8} />
      </section>

      {/* Testimonial Cards */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Poppins' }}>
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SocialTestimonial
            quote="I found the perfect handmade gift and made friends with the artist! This platform is truly a community."
            user="Aarav S."
            avatar="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <SocialTestimonial
            quote="Selling my art here changed my life. The support and feedback from buyers is amazing!"
            user="Meera K."
            avatar="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <SocialTestimonial
            quote="Love the variety and the quality. The social features make art discovery so much fun!"
            user="Kabir R."
            avatar="https://randomuser.me/api/portraits/men/65.jpg"
          />
        </div>
      </section>

      {/* Artistic CTA Footer */}
      <footer className="w-full py-12 px-4 bg-gradient-to-t from-[var(--card)] to-[var(--background)] flex flex-col items-center text-center mt-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Poppins' }}>
          Ready to support handmade?
        </h2>
        <p className="text-muted-foreground max-w-xl mb-6">
          Sign up and join a vibrant community of creators and collectors. Every purchase supports an artist’s dream.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-3 rounded-full shadow-md hover:scale-105 transition">
            Start Exploring
          </Link>
          <Link to="/register" className="border border-[var(--primary)] text-[var(--primary)] px-8 py-3 rounded-full hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition">
            Join as an Artist
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
