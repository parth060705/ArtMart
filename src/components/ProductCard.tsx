import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";

type ProductCardProps = {
    id: number;
    image: string;
    caption: string;
    name: string;
    avatar: string;
    user: string;
    description: string;
    price: string;
    likes: number;
    comments: number;
    variant?: 'default' | 'gallery';
};

export default function ProductCard({
    id,
    image,
    caption,
    name,
    avatar,
    description,
    user,
    price,
    likes,
    comments,
    variant = 'default',
}: ProductCardProps) {
    return (
        <Card key={id} className="mb-4 break-inside-avoid bg-[var(--card)] border-0 shadow-md p-0 overflow-hidden">
            <img src={image} alt={caption} className="w-full h-60 object-cover" />
            <div className="flex items-center gap-3 px-4 py-3">
                <img src={avatar} alt={user} className="w-9 h-9 rounded-full border-2 border-[var(--primary)] object-cover" />
                <span className="font-semibold text-[var(--foreground)]" style={{ fontFamily: 'Poppins' }}>{user}</span>
            </div>
            <div className="px-4 pb-3">
                <p className="text-sm text-[var(--foreground)] mb-2 truncate" title={caption}>{caption}</p>
                <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1"><Heart className="w-5 h-5" />{likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-5 h-5" />{comments}</span>
                    <button className="ml-auto"><Share2 className="w-5 h-5 hover:text-[var(--primary)]" /></button>
                </div>
            </div>
        </Card>
    );
}
