export interface User {
    id: number;
    name: string;
    username: string;
    profileImageUrl: string;
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
    artist: {
        username: string,
        profileImage: string
    },
    isSold: boolean,
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
