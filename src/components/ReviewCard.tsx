import { FunctionComponent } from 'react'
import { Review } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { Star } from 'lucide-react'

interface IReviewCardProps {
    item: Review
    handleRedirectToProfile: (username: string) => void
}

const ReviewCard: FunctionComponent<IReviewCardProps> = ({ item, handleRedirectToProfile }) => {
    return (
        <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-5 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={item.reviewer.profileImage}
                        alt={item.reviewer.username}
                        className="w-14 h-14 rounded-full border-2 border-[var(--primary)] object-cover cursor-pointer"
                        onClick={() => handleRedirectToProfile(item.reviewer.username)}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-avatar.jpg';
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-[var(--foreground)] truncate cursor-pointer" onClick={() => handleRedirectToProfile(item.reviewer.username)}>{item.reviewer.username}</h4>
                        {(item as any)?.status !== 'hidden' && (
                            <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
                                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                                <span className="text-sm font-medium">{item.rating}.0</span>
                            </div>
                        )}
                    </div>
                    {(item as any)?.status !== 'hidden' && (
                        <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                            ))}
                        </div>
                    )}
                    <p
                        className={`mt-3 break-words whitespace-normal leading-relaxed ${
                            (item as any)?.status === 'hidden'
                                ? 'text-xs italic bg-[var(--card)] border border-[var(--accent)] rounded px-3 py-2 text-[var(--muted-foreground)]'
                                : 'text-sm text-[var(--foreground)]'
                        }`}
                    >
                        {(item as any)?.status === 'hidden'
                            ? 'This review has been removed for violating our community guidelines.'
                            : `"${item.comment}"`}
                    </p>
                    {item.createdAt && (
                        <div className="mt-3 text-xs text-[var(--muted-foreground)]">
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
