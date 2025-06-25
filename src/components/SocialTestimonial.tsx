import React from "react";
import { Card } from "@/components/ui/card";

export default function SocialTestimonial({ quote, user, avatar }: { quote: string; user: string; avatar: string }) {
  return (
    <Card className="flex flex-col items-center text-center bg-[var(--card)] border-0 shadow-md p-6">
      <img src={avatar} alt={user} className="w-14 h-14 rounded-full mb-2 object-cover border-2 border-[var(--primary)]" />
      <p className="italic text-[var(--foreground)] mb-2">“{quote}”</p>
      <span className="font-medium text-[var(--primary)]">{user}</span>
    </Card>
  );
}
