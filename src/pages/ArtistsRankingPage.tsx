import React, { useEffect } from 'react';
import { useGetTopArtists } from '@/hooks/useGetTopArtists';
import { TopArtsistResponse } from '@/lib/types';
import { Link } from 'react-router-dom';
import { Star, StarHalf, User } from 'lucide-react';
import placeholderProfileImage from '@/assets/placeholder-profile-image.jpg';
import { Skeleton } from '@/components/ui/skeleton';

const ArtistCard = ({ artist, rank }: { artist: TopArtsistResponse; rank: number }) => {
    const fullStars = Math.floor(artist.avgRating);
    const hasHalfStar = artist.avgRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center p-4 bg-white dark:bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-[var(--muted-foreground)] w-10 text-center">
                {rank}
            </div>
            <div className="ml-4 flex-shrink-0">
                {artist.profileImage ? (
                    <img
                        src={artist.profileImage}
                        alt={artist.username}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center border-2 border-[var(--primary)]">
                        <User className="w-8 h-8 text-[var(--muted-foreground)]" />
                    </div>
                )}
            </div>
            <div className="ml-4 flex-1">
                <Link to={`/profile/${artist.username}`} className="block">
                    <h3 className="text-lg font-semibold hover:text-[var(--primary)] transition-colors">
                        {artist.username}
                    </h3>
                </Link>
                <div className="flex items-center mt-1">
                    <div className="flex text-amber-400">
                        {[...Array(fullStars)].map((_, i) => (
                            <Star key={`full-${i}`} className="w-4 h-4 fill-current" />
                        ))}
                        {hasHalfStar && <StarHalf className="w-4 h-4 fill-current" />}
                        {[...Array(emptyStars)].map((_, i) => (
                            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                        ))}
                        <span className="ml-2 text-sm text-[var(--muted-foreground)]">
                            {artist.avgRating.toFixed(1)} • {artist.reviewCount} reviews
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold text-[var(--primary)]">
                    {artist.avgRating.toFixed(1)}
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">
                    {artist.reviewCount} reviews
                </div>
            </div>
        </div>
    );
};
const ArtistsRankingPage = () => {
    const { data: topArtists, isLoading } = useGetTopArtists();

    useEffect(() => {
        document.title = 'Top Artists | Auroraa';
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Top Artists</h1>
                    <p className="text-[var(--muted-foreground)]">Discover the most talented artists on Auroraa</p>
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center p-4 bg-white dark:bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)]">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="ml-4 flex-1 space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Top Artists</h1>
                <p className="text-[var(--muted-foreground)]">Discover the most talented artists on Auroraa</p>
            </div>

            <div className="space-y-4">
                {topArtists?.length ? (
                    topArtists.map((artist: TopArtsistResponse, index: number) => (
                        <ArtistCard key={artist.artistId} artist={artist} rank={index + 1} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[var(--muted-foreground)]">No artists found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistsRankingPage;
