import * as React from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  label: string;
  content: React.ReactNode;
}

interface SocialTabsProps {
  tabs: Tab[];
  className?: string;
}

export default function SocialTabs({ tabs, className }: SocialTabsProps) {
  const [active, setActive] = React.useState(0);
  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-[var(--muted)] mb-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={cn(
              "px-4 py-2 font-semibold text-[var(--muted-foreground)] transition-all border-b-2 -mb-px outline-none",
              i === active
                ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--card)]"
                : "border-transparent hover:text-[var(--primary)]"
            )}
            style={{ fontFamily: 'Poppins' }}
            onClick={() => setActive(i)}
            aria-selected={i === active}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="transition-all animate-fade-in">
        {tabs[active].content}
      </div>
    </div>
  );
}
