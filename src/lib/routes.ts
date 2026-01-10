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
    static SocialBasePage = 'creators'
    static ProductsListingPage = `${Routes.SocialBasePage}/products`
    static ProductDetailPage = `${Routes.SocialBasePage}/product`
    static ProfilePage = `${Routes.SocialBasePage}/me/profile`
    static ProfileUpdatePage = `${Routes.SocialBasePage}/me/profile/:username/update`
    static ProfilePublicPage = `${Routes.SocialBasePage}/profile`
    static UploadProductPage = `${Routes.SocialBasePage}/upload`
    static EditArtworkPage = `${Routes.SocialBasePage}/artwork-editor`
    static SearchProductPage = `${Routes.SocialBasePage}/search`
    static SavedPage = `${Routes.SocialBasePage}/saved`
    static ArtistsRankingPage = `${Routes.SocialBasePage}/artists-ranking`
    static SettingsPage = `${Routes.SocialBasePage}/settings`
    static ChatListPage = `${Routes.SocialBasePage}/chat-list`
    static ChatPage = `${Routes.SocialBasePage}/chat`
    static AuthLoginPage = "auth/login"
    static AuthRegisterPage = "auth/register"
    static AuthForgotPasswordPage = "auth/forgot-password"
    static AuthResetPasswordPage = "auth/reset-password"
    static CartPage = "auth/cart"
    static WishListPage = "auth/wishlist"
    static PrivacyPolicyPage = "privacy-policy"
    static TermsAndConditionsPage = "terms-and-conditions"
    static BlogPage = "blog"
    static ProtectPage = "protect"
    static protectVerifyPage = "verify"
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
            url: `/${Routes.SocialBasePage}`,
            icon: Home
        },
        {
            title: "Discover",
            url: `/${Routes.SocialBasePage}/products`,
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
            url: `/${Routes.SocialBasePage}/artists-ranking`,
            icon: Users
        },
        {
            title: "Chat",
            url: `/${Routes.ChatListPage}`,
            icon: MessageCircle,
        },
        {
            title: "Saved",
            url: `/${Routes.SavedPage}`,
            icon: Bookmark,
        },
        {
            title: "Settings",
            url: `/${Routes.SettingsPage}`,
            icon: Sliders
        },
    ],
    auth: {
        login: { title: "Login", url: `/${Routes.AuthLoginPage}` },
        signup: { title: "Sign up", url: `/${Routes.AuthRegisterPage}` },
        addtoCart: { title: "Add to Cart", url: `${Routes.CartPage}` },
        wishlist: { title: "Wishlist", url: `${Routes.WishListPage}` },
    },
};