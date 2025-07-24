import { Comment } from "@/lib/types";
import React, { FunctionComponent } from "react";

interface ICommentCardProps {
  item: Comment
}

const CommentCard:FunctionComponent<ICommentCardProps> = ({item}) =>  {
  return (
    <div key={item.id} className="bg-white dark:bg-[var(--card)] rounded-xl p-4 shadow-sm border border-[var(--border)]">
      <div className="flex gap-3">
        <img
          src={item.user.profileImage}
          alt="User"
          className="w-10 h-10 rounded-full border-2 border-[var(--primary)] p-0.5"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-sm">{item.user.username}</span>
              <span className="text-xs text-[var(--muted-foreground)] ml-2">{item.createdAt}</span>
            </div>
            <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 rounded-full hover:bg-[var(--muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-[var(--foreground)]">{item.content}</p>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>24</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard