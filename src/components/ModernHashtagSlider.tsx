import React from "react";

const tags = [
  "#handmade", "#painting", "#sculpture", "#craft", "#decor", "#textile", "#jewelry", "#fiberart", "#artisan", "#indiancraft"
];

export default function ModernHashtagSlider() {
  return (
    <div className="relative w-full overflow-x-auto py-4">
      <div className="flex gap-3 min-w-max px-2 animate-marquee">
        {tags.concat(tags).map((tag, idx) => (
          <span
            key={idx}
            className="bg-gradient-to-r from-[var(--primary)] to-pink-400 text-white px-5 py-2 rounded-full font-semibold text-base shadow hover:scale-105 transition-all border border-[var(--primary)] whitespace-nowrap"
            style={{ fontFamily: 'Poppins', letterSpacing: '0.02em' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
