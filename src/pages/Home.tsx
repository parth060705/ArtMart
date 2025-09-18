import MasonryFeed from '@/components/MasonryFeed'
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import React from 'react'

const HomePage = () => {
    const { data: userProfile } = useUserProfile();
    console.log(userProfile)
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
      <div className="w-full mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <MasonryFeed
                url={userProfile ? '/auth/homefeed' : '/artworks'}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
