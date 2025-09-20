import MasonryFeed from '@/components/MasonryFeed'
import { useWishList } from '@/hooks/useGetWishList'

const WishList = () => {
    const { data: wishList, isLoading } = useWishList();
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
            <MasonryFeed
                data={wishList}
                isLoading={isLoading}
                className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full" />
        </div>
    )
}

export default WishList
