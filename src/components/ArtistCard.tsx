import { Routes } from "@/lib/routes";
import { TopArtsistResponse, UserSearchResult } from "@/lib/types";
import { Award, Star, StarHalf, User } from "lucide-react";
import { Link } from "react-router-dom";

const rankColors = ['bg-yellow-400', 'bg-gray-400', 'bg-amber-700'];

const ArtistCard = ({ artist, rank }: { artist: TopArtsistResponse | UserSearchResult, rank?: number }) => {
    const rating = Math.max(0, Math.min(5, artist.weightedRating || 0));
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    const isTop3 = rank ? rank <= 3 : artist.rank ? artist.rank <= 3 : false;
    const rankColorClass = isTop3 ? rankColors[(rank ?? artist.rank) - 1] : 'bg-[var(--muted)]';

    return (
        <div className="relative flex flex-row items-center p-3 bg-white dark:bg-[var(--card)] rounded-sm border border-[var(--border)] shadow-sm sm:shadow-md">
            {/* Rank Badge */}
            <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow ${rankColorClass}`}>
                {(rank ?? artist.rank) === 1 ? <Award className="w-4 h-4" /> : (rank ?? artist.rank)}
            </div>

            {/* Profile */}
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 flex items-center justify-center 
                border-[var(--accent)] mr-3 sm:mr-4">
                {artist.profileImage ? (
                    <img
                        src={artist.profileImage}
                        alt={artist.username}
                        className={`w-full h-full object-cover rounded-full ${isTop3 ? 'animate-pulse border-gradient-to-r from-primary to-accent' : ''}`}
                    />
                ) : (
                    <div className="w-full h-full bg-[var(--muted)] flex items-center justify-center rounded-full">
                        <User className="w-6 h-6 text-[var(--muted-foreground)]" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-center">
                <Link to={`/${Routes.ProfilePublicPage}/${artist.username}`}>
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)] truncate">{artist.username}</h3>
                </Link>
                <div className="flex items-center mt-1 gap-1">
                    {[...Array(fullStars)].map((_, i) => (
                        <Star key={`full-${i}`} className="w-3 h-3 text-yellow-400" />
                    ))}
                    {hasHalfStar && <StarHalf className="w-3 h-3 text-yellow-400" />}
                    {[...Array(emptyStars)].map((_, i) => (
                        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
                    ))}
                    <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                        {artist.avgRating.toFixed(1)}
                    </span>
                </div>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 text-right ml-2 sm:ml-4">
                <div className="text-sm sm:text-base font-bold text-[var(--primary)]">{artist.avgRating.toFixed(1)}</div>
                <div className="text-[10px] sm:text-xs text-[var(--muted-foreground)]">{artist.reviewCount} reviews</div>
            </div>
        </div>
    );
};

export default ArtistCard;