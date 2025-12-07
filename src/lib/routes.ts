import { Home, Box, Sliders, Bookmark, PlusCircle, Users, MessageCircle } from "lucide-react";
import { ComponentType } from "react";

interface NavItem {
    title: string;
    url: string;
    icon: ComponentType<{ className?: string }>;
    customClass?: string;     
}

interface NavbarRoutes {
    other: NavItem[];
    auth: {
        [key: string]: {
            title: string;
            url: string;
            customClass?: string; 
        };
    };
}

export class Routes {
    static ProductsListingPage = "products"
    static ProductDetailPage = "product"
    static ProfilePage = "/me/profile"
    static ProfileUpdatePage = "/me/profile/:username/update"
    static ProfilePublicPage = "/profile"
    static UploadProductPage = "upload"
    static EditArtworkPage = "artwork-editor"
    static SearchProductPage = "search"
    static AuthLoginPage = "/auth/login"
    static AuthRegisterPage = "/auth/register"
    static AuthForgotPasswordPage = "/auth/forgot-password"
    static AuthResetPasswordPage = "/reset-password"
    static CartPage = "/auth/cart"
    static WishListPage = "/auth/wishlist"
    static SavedPage = "/auth/saved"
    static ArtistsRankingPage = "/artists-ranking"
    static PrivacyPolicyPage = "/privacy-policy"
    static TermsAndConditionsPage = "/terms-and-conditions"
    static SettingsPage = "/settings"
    static ChatPage = "/auth/chat-list"
    static BlogPage ="/blog"
}

interface NavbarRoutes {
    other: NavItem[];
    auth: {
        [key: string]: {
            title: string;
            url: string;
            customClass?: string; 
        };
    };
}

export const navbarRoutes: NavbarRoutes = {
    other: [
        {
            title: "Home",
            url: "/",
            icon: Home
        },
        {
            title: "Discover",
            url: '/products',
            icon: Box
        },
        {
            title: "Add",
            url: `/${Routes.UploadProductPage}`,
            icon: PlusCircle,
            // isCreateButton: true,
            customClass:
                "absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-3xl font-bold hover:scale-105 transition-transform",
        },
        {
            title: "Artists",
            url: '/artists-ranking',
            icon: Users
        },
        {
            title: "Chat",
            url: Routes.ChatPage,
            icon: MessageCircle,
        },
        {
            title: "Saved",
            url: Routes.SavedPage,
            icon: Bookmark,
        },
        {
            title: "Settings",
            url: '/settings',
            icon: Sliders
        },
    ],
    auth: {
        login: { title: "Login", url: Routes.AuthLoginPage },
        signup: { title: "Sign up", url: Routes.AuthRegisterPage },
        addtoCart: { title: "Add to Cart", url: Routes.CartPage },
        wishlist: { title: "Wishlist", url: Routes.WishListPage },
    },
};