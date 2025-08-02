export interface User {
    id: number;
    name: string;
    username: string;
    profileImage: string;
    bio: string;
    location: string;
    gender: string;
    age: number;
    pincode: number;
    phone: number;
    createdAt: string;
    updatedAt: string;
    followers: number;
    following: number;
}

export interface UserProfile extends User {
    followersList: User[];
    followingList: User[];
    products: Product[];
}

export type Product = {
    id: number;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    artist:{
        username: string,
        profileImage: string
    },
    isSold:boolean,
    artistid: string,
    likes: number;
    comments: number;
    location: string;
    createdAt: string;
}

export type Comment = {
    avatar: string;
    name: string;
    text: string;
    media?: string;
    date?: string;
};

export interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

// ----------------------------------------------------FOR ADMIN PANEL TYPES

export type Artwork = {
    id: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    isSold: boolean,
    artistId: string;
    file: File | File[];
    artist:{
        username: string,
        profileImage: string
    },
    createdAt:string;
}

export type Orders = {
  id: number;
  artworkId: number | null;
  totalAmount: number;
  buyer: {
    username: string;
    name: string;
    location:string | null;
  };
  paymentStatus: string;
  buyerId: string;
  createdAt: Date;
};


// -----------------------------------------------------