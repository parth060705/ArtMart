import React from "react";

const tags = [
  "#handmade", "#painting", "#sculpture", "#craft", "#decor", "#textile", "#jewelry", "#fiberart", "#artisan", "#indiancraft"
];

export default function TrendingTags() {
  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="flex gap-3 min-w-max px-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap shadow hover:scale-105 transition" style={{fontFamily:'Poppins'}}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
