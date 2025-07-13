export type Product = {
    id: number;
    images: string[];
    title: string;
    profileImage: string;
    username: string;
    description: string;
    price: number;
    likes: number;
    comments: number;
    category: string;
    location: string;
    createdAt: string;
}

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
  }
  