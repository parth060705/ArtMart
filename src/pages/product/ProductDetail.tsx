import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useProductDetails } from "@/hooks/useProductDetails";
import { useCommentsList } from "@/hooks/useCommentsList";
import { usePostComment } from "@/hooks/usePostComment";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const swiperRef = useRef<any>(null);

  const { data: artwork, isLoading, error } = useProductDetails(id || "");
  const {
    data: comments = [],
    isLoading: commentsLoading,
    error: commentsError,
  } = useCommentsList(id || "");
  const { mutateAsync: postComment, isPending: isPosting } = usePostComment(
    id || ""
  );

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      if (!id) return;
      await postComment({ content: commentText, artwork_id: id });
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment:", error);
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
          <h2 className="text-xl font-semibold text-red-500">
            Error loading artwork
          </h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex">
          <div className="flex-1 p-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                <img
                  src={artwork.artist.profileImage}
                  alt={artwork.artist.username}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="font-medium text-[var(--foreground)]">
                  {artwork.artist.username}
                </span>
                <span className="mx-1">•</span>
                <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="ml-auto">
                <button
                  onClick={() => setIsFollowing((f) => !f)}
                  className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    isFollowing
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--muted)] hover:bg-[var(--muted)]/80"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            {/* Image Slider */}
            <div className="my-3 rounded-md overflow-hidden max-w-3xl mx-auto">
              <Swiper
                spaceBetween={10}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="relative group rounded-lg"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {(artwork.images && artwork.images.length > 0
                  ? artwork.images
                  : [{ url: "https://via.placeholder.com/800x600" }]
                ).map((image: any, index: number) => (
                  <SwiperSlide key={image.id || index}>
                    <div className="flex justify-center items-center w-full">
                      <img
                        src={image.url}
                        alt={`${artwork.title} - ${index + 1}`}
                        className="w-full max-h-[70vh] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x600";
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}

                {artwork.images && artwork.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-white" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-white" />
                    </button>
                  </>
                )}
              </Swiper>
            </div>

            {/* Title, Description & Price */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-medium mb-3">{artwork.title}</h1>
                <p className="text-[15px] my-3 whitespace-pre-line">
                  {artwork.description}
                </p>
              </div>
              <div className="text-2xl font-bold text-[var(--primary)] my-3">
                ₹{artwork.price}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center text-[var(--muted-foreground)] text-sm border-t border-[var(--muted)] pt-3 mt-4 gap-3">
              <button
                className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm"
                onClick={() => setIsWishlisted((w) => !w)}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 ${
                    isWishlisted ? "text-red-500 fill-red-500" : ""
                  }`}
                />
                <span>{artwork.likes + (isWishlisted ? 1 : 0)}</span>
              </button>
              <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                <span>{artwork.comments || comments.length}</span>
              </button>
              <button className="flex items-center p-1.5 sm:p-2 hover:bg-[var(--muted)] rounded text-xs sm:text-sm">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>

            {/* Buy Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base">
                Add to Cart
              </button>
              <button
                disabled={artwork.isSold}
                className="flex-1 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5 font-medium py-2.5 sm:py-2 px-4 rounded-full text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {artwork.isSold ? "Sold Out" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-[var(--card)] rounded-md shadow p-4 mt-4">
          <h2 className="text-lg font-medium mb-4">
            Comments ({comments.length})
          </h2>

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
                    {isPosting ? "Posting..." : "Comment"}
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
                <div
                  key={comment.id || index}
                  className="border-b border-[var(--muted)] pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center text-xs text-[var(--muted-foreground)] mb-1">
                    <img
                      src={comment.user?.profileImage || "/default-avatar.png"}
                      alt={comment.user?.username || "User"}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-medium text-[var(--foreground)]">
                      {comment.user?.username || "Anonymous"}
                    </span>
                    <span className="mx-1">•</span>
                    <span>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center text-xs text-[var(--muted-foreground)] mt-2">
                    <button className="flex items-center p-1 hover:bg-[var(--muted)] rounded">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>Like</span>
                    </button>
                    <button
                      className="flex items-center p-1 hover:bg-[var(--muted)] rounded ml-2"
                      onClick={() =>
                        setCommentText(`@${comment.user?.username || ""} `)
                      }
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
