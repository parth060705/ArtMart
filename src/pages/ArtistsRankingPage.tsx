import React, { useEffect } from 'react';
import { useGetTopArtists } from '@/hooks/useGetTopArtists';
import { TopArtsistResponse } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Star, StarHalf, User, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const rankColors = ['bg-yellow-400', 'bg-gray-400', 'bg-amber-700'];

const ArtistCard = ({ artist, rank }: { artist: TopArtsistResponse; rank: number }) => {
    const fullStars = Math.floor(artist.avgRating);
    const hasHalfStar = artist.avgRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const isTop3 = rank <= 3;
    const rankColorClass = isTop3 ? rankColors[rank - 1] : 'bg-[var(--muted)]';

    return (
        <div className="relative flex flex-row items-center p-3 bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm sm:shadow-md">
            
            {/* Rank Badge */}
            <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow ${rankColorClass}`}>
                {rank === 1 ? <Award className="w-4 h-4" /> : rank}
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
                <Link to={`/profile/${artist.username}`}>
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

const ArtistsRankingPage = () => {
    const { data: topArtists, isLoading } = useGetTopArtists();

    useEffect(() => {
        document.title = 'Top Artists | Auroraa';
    }, []);

    return (
        <div className="container mx-auto px-4 py-6 max-w-xl sm:max-w-3xl">
            <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Top Artists</h1>
                <p className="text-[var(--muted-foreground)] text-sm sm:text-base">Discover the most talented artists on Auroraa</p>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-row items-center p-3 rounded-xl border border-[var(--border)] bg-white dark:bg-[var(--card)] animate-pulse">
                            <Skeleton className="w-10 h-10 rounded-full mr-3" />
                            <div className="flex-1 flex flex-col space-y-1">
                                <Skeleton className="h-3 w-[50%]" />
                                <Skeleton className="h-2 w-[30%]" />
                            </div>
                            <Skeleton className="w-10 h-4 ml-2" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    {topArtists?.length ? (
                        topArtists.map((artist: TopArtsistResponse, index: number) => (
                            <ArtistCard key={artist.artistId} artist={artist} rank={index + 1} />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[var(--muted-foreground)]">No artists found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArtistsRankingPage;
