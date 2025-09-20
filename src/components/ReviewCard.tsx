import { FunctionComponent } from 'react'
import { Review } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface IReviewCardProps {
    item: Review
}

const ReviewCard:FunctionComponent<IReviewCardProps> = ({item}) => {
    return (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 shadow-sm border border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <img
                        src={item.reviewer.profileImage}
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-[var(--primary)] p-0.5"
                    />
                    <div>
                        <h4 className="font-medium">{item.reviewer.username}</h4>
                        <div className="flex items-center gap-1 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-amber-400">★</span>
                            ))}
                            <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <h3 className="font-medium mt-4">Exceeded all my expectations!</h3> */}
            <p className="mt-2 text-sm text-[var(--foreground)]">
                {item.comment}
            </p>
            {/* <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                <button className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span>Helpful (12)</span>
                </button>
            </div> */}
        </div>
    )
}

export default ReviewCard
