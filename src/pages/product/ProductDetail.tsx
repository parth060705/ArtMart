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
import { useCommentsList } from '@/hooks/useCommentsList';
import { usePostComment } from '@/hooks/usePostComment';


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likeAnimating, setLikeAnimating] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  
  const { data: artwork, isLoading, error } = useProductDetails(id || '');
  const { data: comments = [], isLoading: commentsLoading, error: commentsError } = useCommentsList(id || '');
  const { mutateAsync: postComment, isPending: isPosting } = usePostComment(id || '');
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    try {
      if (!id) return; 
      await postComment({ content: commentText, artwork_id: id });
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

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

  console.log(artwork)
  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Post Card */}
        <div className="bg-[var(--card)] rounded-md shadow mb-4 overflow-hidden">
          {/* Voting */}
          <div className="flex">
            {/* Left Voting Bar */}
            {/* <div className="w-10 bg-[var(--card)] flex flex-col items-center py-2 px-1">
              <button 
                onClick={() => setIsWishlisted(w => !w)} 
                className="p-1 hover:bg-[var(--muted)] rounded hover:text-[var(--primary)]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className="font-bold my-1">{artwork.likes + (isWishlisted ? 1 : 0)}</span>
              <button className="p-1 hover:bg-[var(--muted)] rounded hover:text-[var(--primary)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div> */}
            
            {/* Content */}
            <div className="flex-1 p-3">
              {/* Header */}
              <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-2">
                <img 
                  src={artwork.artist.profileImage} 
                  alt={artwork.artist.username} 
                  className="w-6 h-6 rounded-full mr-2" 
                />
                <span className="font-medium text-[var(--foreground)]">{artwork.artist.username}</span>
                <span className="mx-1">•</span>
                <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-xl font-medium mb-3">{artwork.title}</h1>
              
              {/* Image */}
              <div className="my-3 bg-[var(--muted)] rounded-md overflow-hidden flex justify-center">
                <img
                  src={artwork.images?.[0] || 'https://via.placeholder.com/800x600'}
                  alt={artwork.title}
                  className="w-full max-w-2xl mx-auto max-h-[70vh] object-contain p-2"
                  style={{ aspectRatio: '1/1' }}
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600';
                  }}
                />
              </div>
              
              {/* Description */}
              <p className="text-[15px] my-3 whitespace-pre-line">{artwork.description}</p>
              
              {/* Price */}
              <div className="text-lg font-bold text-[var(--primary)] my-3">{artwork.price}</div>
              
              {/* Actions */}
              <div className="flex flex-wrap items-center text-[var(--muted-foreground)] text-sm border-t border-[var(--muted)] pt-3 mt-4 gap-2">
                {/* <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  <span className="hidden xs:inline">{artwork.comments || 0} </span>
                  <span className="xs:hidden">{artwork.comments || 0}</span>
                </button> */}
                <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm ml-0 sm:ml-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  <span className="hidden sm:inline">Like</span>
                </button>
                <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="hidden sm:inline">Save</span>
                </button>
                <div className="ml-auto">
                  <button 
                    onClick={() => setIsFollowing(f => !f)} 
                    className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      isFollowing 
                        ? 'bg-[var(--primary)] text-white' 
                        : 'bg-[var(--muted)] hover:bg-[var(--muted)]/80'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
              
              {/* Buy Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base">
                  Add to Cart
                </button>
                <button 
                  disabled={artwork.isSold}
                  className="flex-1 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5 font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base"
                >
                  {artwork.isSold ? 'Sold Out' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-[var(--card)] rounded-md shadow p-4 mt-4">
          <h2 className="text-lg font-medium mb-4">Comments ({comments.length})</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <img 
                src={artwork.artist.profileImage}
                alt={artwork.artist.username} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="What are your thoughts?" 
                  className="w-full p-2 sm:p-3 border border-[var(--muted)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm sm:text-base"
                  rows={2}
                  disabled={isPosting}
                />
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit"
                    disabled={!commentText.trim() || isPosting}
                    className="px-3 sm:px-4 py-1.5 bg-[var(--primary)] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isPosting ? 'Posting...' : 'Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          {commentsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : commentsError ? (
            <div className="text-center py-4 text-red-500">
              Error loading comments. Please try again later.
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-6 text-[var(--muted-foreground)]">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: any, index: number) => (
                <div key={comment.id || index} className="border-b border-[var(--muted)] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center text-xs text-[var(--muted-foreground)] mb-1">
                    <img 
                      src={comment.user?.profileImage || '/default-avatar.png'} 
                      alt={comment.user?.username || 'User'} 
                      className="w-6 h-6 rounded-full mr-2" 
                    />
                    <span className="font-medium text-[var(--foreground)]">
                      {comment.user?.username || 'Anonymous'}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center text-xs text-[var(--muted-foreground)] mt-2">
                    <button 
                      className="flex items-center p-1 hover:bg-[var(--muted)] rounded"
                      onClick={() => {}}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button 
                      className="flex items-center p-1 hover:bg-[var(--muted)] rounded ml-2"
                      onClick={() => setCommentText(`@${comment.user?.username || ''} `)}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { 
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; 
        }
        .animate-ping-slow {
          animation: ping 0.7s cubic-bezier(.4,0,.2,1) both;
        }
        
        /* Image optimization for better mobile experience */
        @media (max-width: 640px) {
          .aspect-\[4\/3\] { 
            aspect-ratio: 1/1 !important; 
          }
          
          /* Ensure images don't overflow on small screens */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Better touch targets for mobile */
          button, [role="button"] {
            min-height: 2.5rem;
          }
          
          /* Improve text readability on small screens */
          body {
            -webkit-text-size-adjust: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
