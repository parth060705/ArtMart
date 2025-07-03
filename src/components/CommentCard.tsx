import React from "react";

interface CommentCardProps {
  avatar: string;
  name: string;
  text: string;
  media?: string;
  date?: string;
}

export default function CommentCard({ avatar, name, text, media, date }: CommentCardProps) {
  return (
    <div className="flex gap-3 items-start bg-[var(--card)] rounded-xl shadow-sm p-4 mb-3">
      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)]" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[var(--foreground)]" style={{ fontFamily: 'Poppins' }}>{name}</span>
          {date && <span className="text-xs text-[var(--muted-foreground)]">{date}</span>}
        </div>
        <div className="text-[var(--foreground)] text-sm mb-1" style={{ fontFamily: 'Poppins' }}>{text}</div>
        {media && <img src={media} alt="media" className="mt-2 rounded-lg max-w-xs max-h-40 object-cover" />}
      </div>
    </div>
  );
}
