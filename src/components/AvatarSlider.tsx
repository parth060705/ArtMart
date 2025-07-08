import React from "react";
import { Card } from "@/components/ui/card";

const demoAvatars = [
  { name: "Aarav", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Meera", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Kabir", img: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Isha", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Rohan", img: "https://randomuser.me/api/portraits/men/71.jpg" },
  { name: "Saanvi", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Dev", img: "https://randomuser.me/api/portraits/men/24.jpg" },
  { name: "Anya", img: "https://randomuser.me/api/portraits/women/29.jpg" },
];

export default function AvatarSlider() {
  // Modern auto-scroll + drag-to-scroll + glassmorphism
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDown = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

  function handleMouseDown(e: React.MouseEvent) {
    isDown.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  }
  function handleMouseLeave() { isDown.current = false; }
  function handleMouseUp() { isDown.current = false; }
  function handleMouseMove(e: React.MouseEvent) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (sliderRef.current) sliderRef.current.scrollLeft = scrollLeft.current - walk;
  }

  // Touch support for mobile
  function handleTouchStart(e: React.TouchEvent) {
    isDown.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  }
  function handleTouchEnd() { isDown.current = false; }
  function handleTouchMove(e: React.TouchEvent) {
    if (!isDown.current) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (sliderRef.current) sliderRef.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <div className="relative w-full py-6">
      {/* Glassmorphism gradient bar */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-24 bg-gradient-to-r from-[var(--primary)]/30 via-white/20 to-pink-400/30 rounded-2xl blur-2xl z-0 pointer-events-none" />
      <div
        ref={sliderRef}
        className="flex gap-8 min-w-max px-2 overflow-x-auto scrollbar-hide z-10 cursor-grab select-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {demoAvatars.concat(demoAvatars).map((user, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <img
              src={user.img}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-[var(--primary)] shadow-xl mb-2 object-cover transition-all duration-300 group-hover:scale-110 group-hover:border-pink-400"
              style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)' }}
            />
            <span className="text-sm font-semibold text-[var(--foreground)] drop-shadow-sm" style={{fontFamily:'Poppins'}}>{user.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
