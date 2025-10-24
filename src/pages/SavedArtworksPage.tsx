import React, { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import MasonryFeed from '@/components/MasonryFeed'
import { useProductsList } from '@/hooks/useProductsList'
import { useAuth } from '@/hooks/user/auth/UseAuth'
import { Routes } from '@/lib/routes'
import { useNavigate, useLocation } from 'react-router-dom'

const SavedArtworksPage = () => {
    const { data: artworks, isLoading } = useProductsList('/auth/Saved')
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const transformedArtworks = artworks?.map((item: any) => ({
        ...item.artwork
    })) || [];

    useEffect(() => {
        // Redirect if user is not authenticated
        if (!isAuthenticated) {
            navigate(Routes.AuthLoginPage, {
                state: { from: location },
                replace: true
            });
        }
    }, [isAuthenticated, navigate, location]);

    return (
        <div className="p-1 mb-24 md:mb-0">
            <h2 className="text-2xl md:text-4xl font-semibold text-center mb-4 capitalize tracking-wide">
                your curated space
            </h2>
            {isLoading ? <div className='w-[80vw] h-screen flex items-center justify-center'><LoadingSpinner /></div> : <MasonryFeed data={transformedArtworks} isLoading={isLoading} className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full" />}
        </div>
    )
}

export default SavedArtworksPage
