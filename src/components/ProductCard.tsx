import { Card } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface ProductCardProps extends Product {
  variant?: "default" | "gallery";
  onClick?: () => void;
}

export default function ProductCard({
  id,
  images,
  title,
  description,
  artist,
  price,
  tags,
  likes,
  comments,
  variant = "default",
  onClick,
}: ProductCardProps) {
  const safeTags = Array.isArray(tags)
    ? tags.flatMap((tagString) =>
      tagString
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
    : [];
  return (
    <div
      key={id}
      className="group relative break-inside-avoid rounded-3xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-[1.03] focus-within:scale-[1.03] bg-gray-100"
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-pressed={onClick ? false : undefined}
      onClick={onClick}
      style={{ fontFamily: "Poppins" }}
    >
      {/* Background Image */}
      <img
        src={images?.[0]?.url || "/placeholder.jpg"}
        alt={description || title}
        className="w-full h-auto min-h-[280px] max-h-[420px] object-cover object-center block transition-all duration-300"
        style={{ aspectRatio: "3/4", background: "var(--card)" }}
      />

      {/* Overlay: hidden by default, show on hover/focus/tap */}
      <div
        className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-5"
        tabIndex={-1}
      >
        {/* Top: Tags */}
        <div className="flex flex-wrap gap-2">
          {safeTags.map((tag) => (
            <span
              key={tag}
              className="bg-[var(--primary)]/80 text-[var(--primary-foreground)] px-2 py-1 rounded-full text-xs font-medium shadow"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom: Actions + Profile */}
        <div className="flex items-end w-full justify-between mt-auto">
          {/* Profile */}
          {artist && (
            <div className="flex items-center gap-2">
              <img
                src={artist.profileImage || "/avatar-placeholder.png"}
                alt={artist.username}
                className="w-10 h-10 rounded-full border-2 border-[var(--primary)] object-cover shadow"
              />
              <span
                className="font-semibold text-white text-base drop-shadow"
                style={{ fontFamily: "Poppins" }}
              >
                {artist.username}
              </span>
            </div>
          )}
          {/* Social Actions */}
          <div className="flex gap-3 ml-auto">
            <button className="flex items-center gap-1 text-white/90 hover:text-[var(--primary)] transition-all">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-1 text-white/90 hover:text-[var(--primary)] transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}