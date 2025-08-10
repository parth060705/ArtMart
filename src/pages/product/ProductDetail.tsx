import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import CommentCard from '@/components/CommentCard';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductDetails } from '@/hooks/useProductDetails';
import { Comment, Product, Review } from '@/lib/types';
import { useCommentsList } from '@/hooks/comments/useCommentsList';
import { usePostComment } from '@/hooks/comments/usePostComment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { useReviewsList } from '@/hooks/reviews/useReviewsLists';
import { usePostReviews } from '@/hooks/reviews/usePostReviews';
import ReviewCard from '@/components/ReviewCard';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useUserLikeStatus } from '@/hooks/like_dislike/useUserLikeStatus';
import { useLikeProduct } from '@/hooks/like_dislike/useLikeProduct';
import { useDisLikeProduct } from '@/hooks/like_dislike/useDislikeProduct';
import { useAddToCart } from '@/hooks/useAddToCart';
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [likeAnimating, setLikeAnimating] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);
  const [isLocalLiked, setIsLocalLiked] = useState<boolean>(false);
  const [justOptimisticallyLiked, setJustOptimisticallyLiked] = useState(false);

  const swiperRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const { userProfile } = useAuth();

  // Fetch data
  const { data: artwork, isLoading, error } = useProductDetails(id || '');
  const { data: likeStatus } = useUserLikeStatus(id || '');
  const { mutate: likeProduct } = useLikeProduct(id || '');
  const { mutate: dislikeProduct } = useDisLikeProduct(id || '');
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  // Sync local state with server state when data loads
  useEffect(() => {
    if (!justOptimisticallyLiked) {
      if (likeStatus) {
        setIsLocalLiked(likeStatus.has_liked);
      }
      if (artwork?.how_many_like?.like_count !== undefined) {
        setLocalLikeCount(artwork.how_many_like.like_count);
      }
    }
  }, [likeStatus, artwork, justOptimisticallyLiked]);


  const { data: comments = [], isLoading: commentsLoading, error: commentsError } = useCommentsList(id || '');
  const { mutateAsync: postComment, isPending: isPosting } = usePostComment(id || '');
  const { data: reviews = [], isLoading: reviewsLoading, error: reviewsError } = useReviewsList(id || '');
  const { mutateAsync: postReview, isPending: isReviewing } = usePostReviews(id || '');

  // Update isLiked state when likeStatus changes
  useEffect(() => {
    if (likeStatus) {
      // Removed setIsLiked state
    }
  }, [likeStatus]);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    try {
      await postComment({ content: commentText });
      setCommentText('');
    } catch (error) {
      toast.error('Failed to post comment');
    }
  };

  const handlePostReview = async () => {
    if (!reviewText.trim() || rating === 0) {
      toast.error('Please provide both a rating and review text');
      return;
    }
    try {
      await postReview({
        rating,
        comment: reviewText,
        artworkId: id || '',
        artistId: artwork?.artist.id || ''
      });
      setReviewText('');
      setRating(0);
      toast.success('Review posted successfully!');
    } catch (error) {
      toast.error('Failed to post review');
    }
  };

  const handleLikeButtonClick = () => {
    if (likeAnimating) return;

    setLikeAnimating(true);
    setJustOptimisticallyLiked(true);

    const wasLiked = isLocalLiked;
    const previousLikeCount = localLikeCount;
    const newLikeCount = wasLiked ? Math.max(0, previousLikeCount - 1) : previousLikeCount + 1;

    // Optimistic UI update
    setIsLocalLiked(!wasLiked);
    setLocalLikeCount(newLikeCount);

    // Optimistic cache update
    queryClient.setQueryData(['like', id], { has_liked: !wasLiked });
    queryClient.setQueryData(['productDetails', id], (old: any) => ({
      ...old,
      how_many_like: {
        ...old?.how_many_like,
        like_count: newLikeCount,
      },
    }));

    const mutation = wasLiked ? dislikeProduct : likeProduct;

    mutation(undefined, {
      onError: () => {
        // Revert optimistic UI on error
        setIsLocalLiked(wasLiked);
        setLocalLikeCount(previousLikeCount);

        queryClient.setQueryData(['like', id], { has_liked: wasLiked });
        queryClient.setQueryData(['productDetails', id], (old: any) => ({
          ...old,
          how_many_like: {
            ...old?.how_many_like,
            like_count: previousLikeCount,
          },
        }));

        toast.error('Failed to update like. Please try again.');
      },
      onSettled: () => {
        setJustOptimisticallyLiked(false);
        queryClient.invalidateQueries({ queryKey: ['productDetails', id] });
        queryClient.invalidateQueries({ queryKey: ['like', id] });
      },
    });
    setLikeAnimating(false)
  };


  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Error loading artworks</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Post Card */}
            <div className="flex flex-col">
              {/* Content */}
              {/* Header */}
              <div className='flex justify-between items-center mb-2'>
                <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                  <img
                    src={artwork.artist.profileImage}
                    alt={artwork.artist.username}
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <span className="font-medium text-[var(--foreground)]">{artwork.artist.username}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="ml-auto">
                  <button
                    onClick={() => setIsFollowing(f => !f)}
                    className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${isFollowing
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--muted)] hover:bg-[var(--muted)]/80'
                      }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>

              {/* Image Slider */}
              <div className="my-3 rounded-md overflow-hidden w-full max-w-xl mx-auto">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={artwork.images?.length > 1}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    // when window width is >= 320px
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10
                    },
                    // when window width is >= 480px
                    480: {
                      slidesPerView: 1,
                      spaceBetween: 15
                    },
                    // when window width is >= 768px
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20
                    },
                    // when window width is >= 1024px
                    1024: {
                      slidesPerView: 1,
                      spaceBetween: 25
                    }
                  }}
                  modules={[Navigation, Pagination]}
                  className="relative group rounded-lg w-full"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                >
                  {(artwork.images && artwork.images.length > 0 ? artwork.images : ['https://via.placeholder.com/800x600']).map((image: string, index: number) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                      <div className="w-full h-full flex justify-center items-center">
                        <img
                          src={image}
                          alt={`${artwork.title} - ${index + 1}`}
                          className="w-full h-auto max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh] object-contain"
                          onError={e => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600';
                          }}
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* Custom Navigation Buttons - Only show if there are multiple images */}
                  {artwork.images && artwork.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 opacity-75 hover:opacity-100"
                        aria-label="Previous slide"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 opacity-75 hover:opacity-100"
                        aria-label="Next slide"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </Swiper>
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  {/* Title */}
                  <h1 className="text-xl font-medium mb-3">{artwork.title}</h1>

                  {/* Description */}
                  <p className="text-[15px] my-3 whitespace-pre-line">{artwork.description}</p>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-[var(--primary)] my-3">₹{artwork.price}</div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center text-[var(--muted-foreground)] text-sm border-t border-[var(--muted)] pt-3 mt-4 gap-2">
                {/* <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  <span className="hidden xs:inline">{artwork.comments || 0} </span>
                  <span className="xs:hidden">{artwork.comments || 0}</span>
                </button> */}
                <button
                  className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm ml-0 sm:ml-2 relative"
                  onClick={handleLikeButtonClick}
                >
                  <Heart
                    className={`w-6 h-6 mr-1.5 cursor-pointer transition-all duration-300 ${likeAnimating ? 'scale-125' : 'scale-100'} ${isLocalLiked ? 'fill-red-500 text-red-500' : 'text-[var(--muted-foreground)]'}`}
                    onAnimationEnd={() => setLikeAnimating(false)}
                  />
                  <span className={`transition-colors duration-300 ${isLocalLiked ? 'text-red-500 font-medium' : 'text-[var(--muted-foreground)]'}`}>
                    {localLikeCount}
                  </span>
                </button>
                <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                  <svg className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>

              {/* Buy Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button 
                  onClick={() => addToCart(artwork.id)}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {isAddingToCart ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : 'Add to Cart'}
                </button>
                <button
                  disabled={artwork.isSold}
                  className="flex-1 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5 font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base"
                >
                  {artwork.isSold ? 'Sold Out' : 'Buy Now'}
                </button>
              </div>
            </div>

            {/* Comments & Reviews Section */}
            <div className="max-w-4xl mx-auto md:px-4 py-8">
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[280px] bg-[var(--muted)] rounded-xl">
                  <TabsTrigger
                    value="comments"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Comments
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      Reviews
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="">
                  <div className="space-y-2">
                    {/* Comment input */}
                    <div className="bg-white dark:bg-[var(--card)] rounded-xl p-4 shadow-sm border border-[var(--border)]">
                      <div className="flex gap-3">
                        <img
                          src={userProfile?.profileImage}
                          alt="Your profile"
                          className="w-10 h-10 rounded-full border-2 border-[var(--primary)] p-0.5"
                        />
                        <div className="flex-1">
                          <textarea
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Share your thoughts about this artwork..."
                            className="w-full bg-[var(--muted)] rounded-xl p-3 text-sm border border-transparent focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all min-h-[100px] resize-none"
                          />
                          <div className="flex justify-between items-center mt-3">
                            {/* <div className="flex gap-2">
                          <button className="p-1.5 rounded-full hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                          </button>
                        </div> */}
                            <button
                              className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                              disabled={isPosting}
                              onClick={handlePostComment}
                            >
                              {isPosting ? 'Posting...' : 'Post Comment'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments list */}
                    <div className="space-y-2">
                      {comments.map((item: Comment) => (
                        <CommentCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8">
                  <div className="space-y-6">
                    {/* Review input */}
                    <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 shadow-sm border border-[var(--border)]">
                      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className={`text-3xl transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-[var(--muted)]'}`}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                            >
                              ★
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-[var(--muted-foreground)]">
                            {rating ? `Rated ${rating} star${rating > 1 ? 's' : ''}` : 'Tap to rate'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Your review</h4>
                          <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="What did you like or dislike? What did you use this product for?"
                            className="w-full bg-[var(--muted)] rounded-xl p-3 text-sm border border-transparent focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all min-h-[120px] resize-none"
                          />
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={handlePostReview}
                            disabled={isReviewing}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isReviewing ? 'Submitting...' : 'Submit Review'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Reviews list */}
                    <div className="space-y-6">
                      {reviews.map((item: Review) => (
                        <ReviewCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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
          /*img {
            max-width: 100%;
            height: auto;
          }*/
          
          /* Better touch targets for mobile */
          button, [role="button"] {
            min-height: 2.5rem;
          }
          
          /* Improve text readability on small screens */
          body {
            -webkit-text-size-adjust: 100%;
          }
        `}</style>
    </div>
  );
};

export default ProductDetail;
