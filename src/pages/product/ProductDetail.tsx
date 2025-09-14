import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CommentCard from '@/components/CommentCard';
import { Heart } from 'lucide-react';
import { useProductDetails } from '@/hooks/useProductDetails';
import { Comment, Review } from '@/lib/types';
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

  const { data: artwork, isLoading, error } = useProductDetails(id || '');
  const { data: likeStatus } = useUserLikeStatus(id || '');
  const { mutate: likeProduct } = useLikeProduct(id || '');
  const { mutate: dislikeProduct } = useDisLikeProduct(id || '');
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  useEffect(() => {
    if (!justOptimisticallyLiked) {
      if (likeStatus) setIsLocalLiked(likeStatus.has_liked);
      if (artwork?.how_many_like?.like_count !== undefined) {
        setLocalLikeCount(artwork.how_many_like.like_count);
      }
    }
  }, [likeStatus, artwork, justOptimisticallyLiked]);

  const { data: comments = [] } = useCommentsList(id || '');
  const { mutateAsync: postComment, isPending: isPosting } = usePostComment(id || '');
  const { data: reviews = [] } = useReviewsList(id || '');
  const { mutateAsync: postReview, isPending: isReviewing } = usePostReviews(id || '');

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    try {
      await postComment({ content: commentText });
      setCommentText('');
    } catch {
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
    } catch {
      toast.error('Failed to post review');
    }
  };

  const handleLikeButtonClick = () => {
    if (likeAnimating) return;
    setLikeAnimating(true);
    setJustOptimisticallyLiked(true);

    const wasLiked = isLocalLiked;
    const prevCount = localLikeCount;
    const newCount = wasLiked ? Math.max(0, prevCount - 1) : prevCount + 1;

    setIsLocalLiked(!wasLiked);
    setLocalLikeCount(newCount);

    queryClient.setQueryData(['like', id], { has_liked: !wasLiked });
    queryClient.setQueryData(['productDetails', id], (old: any) => ({
      ...old,
      how_many_like: { ...old?.how_many_like, like_count: newCount }
    }));

    const mutation = wasLiked ? dislikeProduct : likeProduct;
    mutation(undefined, {
      onError: () => {
        setIsLocalLiked(wasLiked);
        setLocalLikeCount(prevCount);
        toast.error('Failed to update like. Please try again.');
      },
      onSettled: () => {
        setJustOptimisticallyLiked(false);
        queryClient.invalidateQueries({ queryKey: ['productDetails', id] });
        queryClient.invalidateQueries({ queryKey: ['like', id] });
      },
    });
    setLikeAnimating(false);
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
        <h2 className="text-xl font-semibold text-red-500">Error loading artwork</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-10">

        {/* Left Pane (2/3) */}
        <div className="lg:col-span-2 lg:bg-white dark:bg-[var(--card)] lg:rounded-2xl lg:shadow lg:p-8 space-y-6">
          {/* Artist */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={artwork.artist.profileImage}
                  alt={artwork.artist.username}
                  className="w-14 h-14 rounded-full border-2 border-[var(--primary)] object-cover shadow"
                />
                <div className="ml-3">
                  <p className="font-semibold text-lg">{artwork.artist.username}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFollowing(f => !f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${isFollowing
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--muted)] hover:bg-[var(--muted)]/80"
                }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {(artwork.images && artwork.images.length > 0
                ? artwork.images
                : ["https://via.placeholder.com/600x400"]
              ).map((img: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img?.url || img}
                    alt={`${artwork.title}-${idx}`}
                    className="w-full h-auto max-h-[500px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Title + Price */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold">{artwork.title}</h1>
              <p className="mt-1 text-base text-[var(--muted-foreground)]">
                {artwork.description}
              </p>
            </div>
            <div className="text-2xl font-extrabold text-[var(--primary)]">
              ₹{artwork.price}
            </div>
          </div>
          <div>
            {/* Tags Section */}
            {artwork?.tags && artwork.tags.length > 0 && (
              <div className="mt-3 text-sm text-[var(--muted-foreground)]">
                {artwork.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="text-[var(--primary)] font-medium">
                    {tag}{idx < artwork.tags.length - 1 && <span className="text-[var(--muted-foreground)]">, </span>}
                  </span>
                ))}
              </div>
            )}


          </div>

          {/* Like + Save */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleLikeButtonClick}
              className="flex items-center gap-2"
            >
              <Heart
                className={`w-7 h-7 ${isLocalLiked
                  ? "fill-red-500 text-red-500"
                  : "text-[var(--muted-foreground)]"
                  }`}
              />
              <span className="text-lg">{localLikeCount}</span>
            </button>
            <button className="flex items-center gap-2 text-[var(--muted-foreground)]">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5h14v16l-7-3.5L5 21z"
                />
              </svg>
              Save
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(artwork.id)}
              disabled={isAddingToCart}
              className="flex-1 bg-[var(--primary)] text-white font-medium py-3 rounded-full text-lg"
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button
              disabled={artwork.isSold}
              className="flex-1 border border-[var(--primary)] text-[var(--primary)] font-medium py-3 rounded-full text-lg"
            >
              {artwork.isSold ? "Sold Out" : "Buy Now"}
            </button>
          </div>
        </div>

        {/* Right Pane (1/3) */}
        <div className="lg:col-span-1 lg:bg-white dark:bg-[var(--card)] lg:rounded-2xl lg:shadow lg:p-6">
          <Tabs defaultValue="comments">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Comments */}
            <TabsContent value="comments" className="h-full flex flex-col">
              {/* Add Comment Input (on top) */}
              <div className="border-b mb-3 pb-3 flex items-center gap-3">
                <img
                  src={userProfile?.profileImage || "/default-avatar.png"}
                  alt="me"
                  className="w-11 h-11 rounded-full border-2 border-[var(--primary)] object-cover shadow"

                />
                <div className="flex-1 flex items-center rounded-full border px-2 py-2 bg-[var(--background)]">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    onClick={handlePostComment}
                    disabled={isPosting || !commentText.trim()}
                    className={`ml-2 text-sm font-semibold ${commentText.trim()
                      ? "text-[var(--primary)] hover:opacity-80"
                      : "text-gray-400"
                      }`}
                  >
                    {isPosting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {comments.length > 0 ? (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <img
                        src={comment.user?.profileImage || "/default-avatar.png"}
                        alt={comment.user?.username || "user"}
                        className="w-10 h-10 rounded-full border-2 border-[var(--primary)] object-cover shadow"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{comment.user?.username}</span>
                        <p className="text-sm text-[var(--foreground)]">{comment.content}</p>
                        {/* Optional timestamp */}
                        {/* <span className="text-xs text-[var(--muted-foreground)] mt-1">
                            {new Date(comment.createdAt).toLocaleDateString()}
                            </span> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No comments yet — be the first one!
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <div className="space-y-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-400'}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-2 rounded border bg-[var(--muted)]"
                  />
                  <button
                    onClick={handlePostReview}
                    disabled={isReviewing}
                    className="mt-2 px-4 py-1 bg-[var(--primary)] text-white rounded"
                  >
                    {isReviewing ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
                {reviews.map((r: Review) => (
                  <ReviewCard key={r.id} item={r} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;