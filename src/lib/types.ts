// ------------------ USERS ------------------

export interface User {
  id: string;
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
  rank: number;
  reviewCount: number;
  avgRating: number;
  profile_completion: number;
}

export interface UserUpdate {
  name: string;
  username: string;
  bio: string;
  location: string;
  gender: string;
  age: number;
  pincode: number;
  phone: number;
}

export interface UserProfile extends User {
  followersList: User[];
  followingList: User[];
  products: Product[];
}

export interface TopArtsistResponse {
  artistId: string;
  avgRating: number;
  reviewCount: number;
  username: string;
  profileImage: string;
  rank?: number;
}

export interface UserSearchResult {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  avgRating: number;
  reviewCount: number;
  bio: string;
  rank?: number;
}

export interface PostReviewProps {
  rating: number;
  setRating: (rating: number) => void;
  hoverRating: number;
  setHoverRating: (rating: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  isReviewing: boolean;
  handlePostReview: () => void;
  showTextArea: boolean;
}

export type Image = {
  id: string;
  url: string;
  public_id: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  images: Image[];
  price: number;
  tags: string[];
  quantity: number;
  category: string;
  isInCart: boolean;
  artist: {
    id: string;
    username: string;
    profileImage: string;
  };
  how_many_like: {
    like_count: number;
  }
  isSold: boolean;
  artistid: string;
  likes: number;
  comments: number;
  isLike: boolean;
  isSaved: boolean;
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
  reviewerId: string;
  createdAt: string;
  artworkId: string;
  artistId: string;
  reviewer: {
    username: string;
    profileImage?: string;
  };
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

export type adminauditLogs = {
  method: string;
  path: string;
  action: string;
  description: string;
  ip_address: string;
  id: string;
  admin_id: string;
  timestamp: Date;
}

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

// ------------------ PASSWORD MANAGEMENT ------------------

// forgot-password
export interface UseForgotPasswordState {
  loading: boolean;
  error: string | null;
  message: string;
}

export interface UseForgotPasswordReturn extends UseForgotPasswordState {
  forgotPassword: (email: string) => Promise<void>;
}

// resetPassword
export interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
}
export interface ResetPasswordResponse {
  message: string;
}

export interface ChangePasswordRequest {
  new_password: string;
  old_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}


export interface ChatListResponse {
  lastMessage: string;
  lastMessageAt: string;
  lastMessageType: string;
  name: string;
  profileImage: string;
  unreadCount: number;
  user_id: string;
  username: string;
}