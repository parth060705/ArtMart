import React, { useEffect, useState } from 'react';
import { useGetTopArtists } from '@/hooks/useGetTopArtists';
import { TopArtsistResponse } from '@/lib/types';
import { Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserSearch } from '@/hooks/useUserSearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ArtistCard from '@/components/ArtistCard';


const ArtistsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: topArtists, isLoading } = useGetTopArtists();
    const { data: searchResults, isLoading: isSearchingUsers } = useUserSearch(searchQuery);

    useEffect(() => {
        document.title = 'Top Artists | Auroraa';
    }, []);

    const clearSearch = () => {
        setSearchQuery('');
    };
    return (
        <div className="container mx-auto px-4 py-6 max-w-xl sm:max-w-3xl mb-20 md:mb-0">
            <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    {searchQuery ? 'Search Results' : 'Top Artists'}
                </h1>
                <p className="text-[var(--muted-foreground)] text-sm sm:text-base">
                    {searchQuery ? `Searching for "${searchQuery}"` : 'Discover talented artists on Auroraa'}
                </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                    <Input
                        type="text"
                        placeholder="Search artists"
                        className="pl-10 pr-10 py-5 w-full rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                            onClick={clearSearch}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {searchQuery.trim() ? (
                <div className="space-y-3">
                    {isSearchingUsers ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center p-3 bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] animate-pulse">
                                    <Skeleton className="w-12 h-12 rounded-full mr-3" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchResults && searchResults?.length > 0 ? (
                        <div className="space-y-3">
                            {searchResults.map((user, index) => (
                                <ArtistCard
                                    key={user.id}
                                    artist={{
                                        ...user,
                                        artistId: user.id,
                                        avgRating: user.avgRating,
                                        reviewCount: user.reviewCount,
                                        username: user.username
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[var(--muted-foreground)]">No artists found matching "{searchQuery}"</p>
                            <Button variant="ghost" onClick={clearSearch} className="mt-2">
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                // Original top artists list
                isLoading ? (
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
                )
            )}
        </div>
    );
};

export default ArtistsPage;
