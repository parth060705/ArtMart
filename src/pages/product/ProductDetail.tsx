import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// If '@lucide/react' is installed, use this import:
// import { Heart, MessageCircle, Share2 } from '@lucide/react';
import SocialTabs from '@/components/SocialTabs';
import CommentCard from '@/components/CommentCard';
import ProductCard from '@/components/ProductCard';
import AvatarSlider from '@/components/AvatarSlider';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useProductDetails } from '@/hooks/useProductDetails';
import { Product } from '@/lib/types';

// --- Types ---
type Artwork = {
  title: string;
  artist: string;
  artistAvatar: string;
  artistBio: string;
  year: number;
  medium: string;
  dimensions: string;
  price: string;
  imageUrl: string;
  description: string;
  hashtags: string[];
  tags: string[];
  creationInfo: string;
  stats: { likes: number; comments: number; reshares: number };
  related?: number[];
};
type Comment = {
  avatar: string;
  name: string;
  text: string;
  media?: string;
  date?: string;
};

const artworkDB: Record<number, Artwork> = {
  1: {
    title: 'Sunset Dreams',
    artist: 'Jane Doe',
    artistAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    artistBio: 'Dreamer, colorist, and lover of sunsets. Creating peace with every brushstroke.',
    year: 2022,
    medium: 'Oil on canvas',
    dimensions: '60 x 80 cm',
    price: '₹1200',
    imageUrl: 'https://via.placeholder.com/800x600?text=Sunset+Dreams',
    description: 'A calming depiction of the sky just before twilight. Inspired by the artist’s childhood memories.',
    hashtags: ['#sunset', '#oilpainting', '#calm'],
    tags: ['nature', 'canvas', 'peaceful'],
    creationInfo: 'Created in Mumbai, 2022',
    stats: { likes: 143, comments: 19, reshares: 7 },
    related: [2],
  },
  2: {
    title: 'Cosmic Whispers',
    artist: 'Arjun Singh',
    artistAvatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    artistBio: 'Abstract explorer. Finding stories in starlight and pigment.',
    year: 2023,
    medium: 'Acrylic',
    dimensions: '90 x 60 cm',
    price: '₹1800',
    imageUrl: 'https://via.placeholder.com/800x600?text=Cosmic+Whispers',
    description: 'Stars conversing across galaxies in a swirl of color. For dreamers and cosmic thinkers.',
    hashtags: ['#cosmic', '#acrylic', '#abstract'],
    tags: ['space', 'modern', 'colorful'],
    creationInfo: 'Created in Delhi, 2023',
    stats: { likes: 201, comments: 34, reshares: 12 },
    related: [1],
  },
};

const comments: Comment[] = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Aarav S.',
    text: 'Absolutely love the color palette! Feels so peaceful.',
    date: '2d ago',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Isha K.',
    text: 'Reminds me of my hometown sunsets. Beautiful work!',
    date: '1d ago',
    media: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];
const reviews: Comment[] = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'Rohan T.',
    text: 'Arrived quickly and looks even better in person! Highly recommend supporting this artist.',
    date: '3d ago',
  },
];
const reshares: Comment[] = [
  {
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Saanvi M.',
    text: 'Shared with my art group. Everyone admired the brushwork!',
    date: '6h ago',
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  // const [artwork, setArtwork] = useState<Product>({} as Product);
  const [likeAnimating, setLikeAnimating] = useState<boolean>(false);
  const { data: artwork, isLoading, error } = useProductDetails(id || '')
  // useEffect(() => {
  //   setArtwork(data);
  // }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Error loading artwork</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }
  // Related posts (demo)
  // const relatedPosts = artwork.related?.map(rid => artworkDB[rid]) || [];

  return (
    <div className="min-h-screen w-full max-w-screen bg-[var(--background)] font-sans text-[var(--foreground)] flex flex-col overflow-x-hidden" style={{ fontFamily: 'Poppins' }}>
      {/* Artist Card */}
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-4 bg-[var(--card)] rounded-2xl shadow-lg px-6 py-4 border border-[var(--muted)]">
          <img src={artwork.profileImage} alt={artwork.username} className="w-16 h-16 rounded-full border-4 border-[var(--primary)] object-cover" />
          <div className="flex-1">
            <div className="font-bold text-lg text-[var(--foreground)]">{artwork.username}</div>
            <div className="text-sm text-[var(--muted-foreground)]">{artwork.description}</div>
          </div>
          <button onClick={() => setIsFollowing(f => !f)} className={`rounded-full px-5 py-2 font-semibold transition-all shadow-sm border ${isFollowing ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-white text-[var(--primary)] border-[var(--primary)] hover:bg-[var(--primary)]/10'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
        </div>
      </div>
      {/* Top Section: Image + Info */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 bg-[var(--background)] pt-10 pb-4 px-2 md:px-0">
        {/* Product Image */}
        <div className="flex-1 min-w-[260px] max-w-md mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-xl bg-[var(--card)] flex items-center justify-center">
          {artwork.images?.[0] && (
            <img
              src={artwork.images[0]}
              alt={artwork.title}
              className="w-full h-auto max-h-[420px] object-cover transition-transform duration-500 hover:scale-105 bg-gray-100"
              onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
              }}
              style={{ aspectRatio: '4/3', background: '#f3f4f6' }}
            />
          )}
        </div>
        {/* Info and Social Actions */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">{artwork && artwork.title}</h1>
              <span className="ml-auto text-2xl font-bold text-[var(--primary)]">{artwork && artwork.price}</span>
            </div>
            {/* <div className="flex flex-wrap gap-2 mb-2">
              {artwork.hashtags.map(tag => (
                <span key={tag} className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div> */}
            <div className="text-[var(--foreground)] text-base mb-4" style={{ fontFamily: 'Poppins' }}>{artwork.description}</div>
            {/* <div className="flex flex-wrap gap-2 mb-2">
              {artwork.tags.map(tag => (
                <span key={tag} className="bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div> */}
            {/* <div className="text-xs text-[var(--muted-foreground)] mb-2">{artwork.creationInfo}</div> */}
          </div>
          {/* Social Actions */}
          {/* <div className="flex gap-4 mt-2 mb-2">
            <button onClick={() => { setIsWishlisted(w => !w); setLikeAnimating(true); setTimeout(() => setLikeAnimating(false), 700); }} className="flex items-center gap-1 group focus:outline-none px-3 py-2 rounded-full bg-white/70 shadow hover:bg-[var(--primary)]/10 transition-all">
              <Heart className={`w-7 h-7 transition-all duration-300 ${isWishlisted ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400'} ${likeAnimating ? 'animate-ping-slow' : ''}`} strokeWidth={2.2} />
              <span className="text-base font-semibold text-[var(--foreground)]">{artwork.likes + (isWishlisted ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 group px-3 py-2 rounded-full bg-white/70 shadow hover:bg-blue-100 transition-all">
              <MessageCircle className="w-7 h-7 text-blue-500 group-hover:text-blue-600" strokeWidth={2.2} />
              <span className="text-base font-semibold text-[var(--foreground)]">{artwork.comments}</span>
            </button>
            <button className="flex items-center gap-1 group px-3 py-2 rounded-full bg-white/70 shadow hover:bg-[var(--primary)]/10 transition-all">
              <Share2 className="w-7 h-7 text-[var(--primary)] group-hover:text-[var(--primary-foreground)]" strokeWidth={2.2} />
              <span className="text-base font-semibold text-[var(--foreground)]">{artwork.reshares}</span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full max-w-3xl mx-auto mt-8 px-2 md:px-0">
        <SocialTabs
          tabs={[
            {
              label: 'Comments',
              content: (
                <div className="pt-2">
                  {comments.map((c, i) => <CommentCard key={i} {...c} />)}
                  <div className="text-center text-xs text-[var(--muted-foreground)] mt-2">Join the conversation!</div>
                </div>
              ),
            },
            {
              label: 'Reviews',
              content: (
                <div className="pt-2">
                  {reviews.map((c, i) => <CommentCard key={i} {...c} />)}
                  <div className="text-center text-xs text-[var(--muted-foreground)] mt-2">Reviews from supporters.</div>
                </div>
              ),
            },
            // {
            //   label: 'Reshares',
            //   content: (
            //     <div className="pt-2">
            //       {reshares.map((c, i) => <CommentCard key={i} {...c} />)}
            //       <div className="text-center text-xs text-[var(--muted-foreground)] mt-2">See who shared this post.</div>
            //     </div>
            //   ),
            // },
          ]}
        />
      </div>

      {/* Related Posts Grid */}
      {/* <div className="w-full max-w-5xl mx-auto mt-16 px-2 md:px-0">
        <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Related Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedPosts.map((art, i) => (
            <ProductCard
              key={i}
              id={i}
              images={art.images}
              caption={art.description}
              name={art.title}
              avatar={art.profileImage}
              description={art.description}
              user={art.username}
              price={art.price}
              likes={art.likes}
              comments={art.comments}
            />
          ))}
        </div>
      </div> */}

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center z-40 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-3xl mx-auto bg-[var(--card)] rounded-t-2xl shadow-2xl flex items-center justify-between px-6 py-4 border border-[var(--muted)] gap-4">
          <div className="text-2xl font-extrabold text-[var(--primary)]">{artwork.price}</div>
          <button className="rounded-full px-8 py-3 font-bold text-lg bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:scale-105 transition-all" style={{ fontFamily: 'Poppins' }}>
            Support the Artist
          </button>
        </div>
      </div>

      {/* Artist Bio Card */}
      <div className="w-full max-w-3xl mx-auto mt-16 px-2 md:px-0">
        <div className="flex items-center gap-4 bg-[var(--card)] rounded-2xl shadow-lg px-6 py-5 border border-[var(--muted)]">
          <img src={artwork.profileImage} alt={artwork.username} className="w-16 h-16 rounded-full border-4 border-[var(--primary)] object-cover" />
          <div className="flex-1">
            <div className="font-bold text-lg text-[var(--foreground)]">{artwork.username}</div>
            <div className="text-sm text-[var(--muted-foreground)]">{artwork.description}</div>
          </div>
          <button onClick={() => setIsFollowing(f => !f)} className={`rounded-full px-5 py-2 font-semibold transition-all shadow-sm border ${isFollowing ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-white text-[var(--primary)] border-[var(--primary)] hover:bg-[var(--primary)]/10'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-ping-slow {
          animation: ping 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        @media (max-width: 640px) {
          .aspect-\[4\/3\] { aspect-ratio: 1/1 !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
