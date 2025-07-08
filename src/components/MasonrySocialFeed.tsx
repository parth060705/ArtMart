import { useProductsList } from "@/query/hooks/useProductsList";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

const demoPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Aarav",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 57,
    comments: 12,
    caption: "Sunset vibes! #nature #painting",
    price: "₹2,499"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Meera",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 123,
    comments: 34,
    caption: "Handmade with love. #craft #doll",
    price: "₹2,499"
  },
  {
    id: 3,
    image: "https://plus.unsplash.com/premium_photo-1679868096292-54efdc6c021f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Kabir",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    likes: 88,
    comments: 22,
    caption: "Eco-friendly terracotta craft! #sculpture",
    price: "₹2,499"
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1668620538983-c5993e4a443d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Isha",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    likes: 64,
    comments: 10,
    caption: "Decor inspiration for your home. #decor #handmade",
    price: "₹2,499"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    user: "Rohan",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    likes: 41,
    comments: 8,
    caption: "Textile art is my passion. #textile #fiberart",
    price: "₹2,499"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    user: "Saanvi",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    likes: 75,
    comments: 19,
    caption: "Jewelry that tells a story. #jewelry #artisan",
    price: "₹2,499"
  },
];

export default function MasonrySocialFeed() {
  const { data } = useProductsList()
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 w-full">
      {data?.map((item: Product) => (
        <ProductCard
          key={item.id}
          id={item.id}
          images={item.images}
          username={item.username}
          profileImage={item.profileImage}
          description={item.description}
          price={item.price.toString()}
          likes={item.likes}
          comments={item.comments}
          title={item.title}
        />
      ))}
    </div>
  );
}
