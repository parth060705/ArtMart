import { Home, Box, Menu, ShoppingCart, Sliders, BookMarked, Bookmark } from "lucide-react";
import { ComponentType } from "react";

interface NavItem {
    title: string;
    url: string;
    icon: ComponentType<{ className?: string }>;
}

interface NavbarRoutes {
    other: NavItem[];
    auth: {
        [key: string]: {
            title: string;
            url: string;
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
    static SearchProductPage = "search"
    static AuthLoginPage = "/auth/login"
    static AuthRegisterPage = "/auth/register"
    static AuthForgotPasswordPage = "/auth/forgot-password"
    static AuthResetPasswordPage = "/auth/reset-password"
    static CartPage = "/auth/cart"
    static WishListPage = "/auth/wishlist"
    static PrivacyPolicyPage = "/privacy-policy"
    static TermsAndConditionsPage = "/terms-and-conditions"
}

interface NavbarRoutes {
    other: NavItem[];
    auth: {
        [key: string]: {
            title: string;
            url: string;
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
    ],
    auth: {
        login: { title: "Login", url: Routes.AuthLoginPage },
        signup: { title: "Sign up", url: Routes.AuthRegisterPage },
        addtoCart: { title: "Add to Cart", url: Routes.CartPage },
        wishlist: { title: "Wishlist", url: Routes.WishListPage },
    },
};