// ------------------ USERS ------------------

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

// ------------------ IMAGE ------------------

export type Image = {
  id: string;
  url: string;
  public_id: string;
};

// ------------------ PRODUCT ------------------

export type Product = {
  id: number;
  title: string;
  description: string;
  images: Image[];
  price: number;
  tags: string[];
  quantity: number;
  category: string;
  artist: {
    username: string;
    profileImage: string;
  };
  isSold: boolean;
  artistid: string;
  likes: number;
  comments: number;
  location: string;
  createdAt: string;
};

// ------------------ COMMENT ------------------

export type Comment = {
  id: string;              // ✅ unique identifier
  text: string;            // ✅ comment text
  avatar: string;          // ✅ author avatar
  name: string;            // ✅ author name
  date?: string;           // ✅ optional timestamp
  media?: string;          // ✅ optional attachment

  replies?: Comment[];     // ✅ nested replies
  parentId?: string;       // ✅ for threaded structure
};

// ------------------ REVIEW ------------------

export type Review = {
  id: string;
  rating: number;
  comment: string;
  author: {
    id: string;
    username: string;
    profileImage?: string;
  };
  createdAt: string;
  artworkId: string;
  artistId: string;
};

// ------------------ MENU ------------------

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

// ------------------ ADMIN ------------------

export type Artwork = {
  id: string;
  title: string;
  description: string;
  images: Image[];
  price: number;
  tags: string[];
  quantity: number;
  category: string;
  isSold: boolean;
  artistId: string;
  file: File | File[];
  artist: {
    username: string;
    profileImage: string;
  };
  createdAt: string;
};

export type Orders = {
  id: number;
  artworkId: number | null;
  totalAmount: number;
  buyer: {
    username: string;
    name: string;
    location: string | null;
  };
  artwork: {
    title: string;
    price: number;
  };
  paymentStatus: string;
  buyerId: string;
  createdAt: Date;
};

// ------------------ MESSAGES ------------------

export type chatMessage = {
  receiver_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
  action: "message" | "typing" | "read";
  message_type: "text" | "image" | "video" | "file";
};

// export type MessageOut = {
//   sender_id: string;
//   receiver_id: string;
//   content: string;
//   timestamp: string;
//   is_read: boolean;
//   message_type: "text" | "image" | "video" | "file";
// };
