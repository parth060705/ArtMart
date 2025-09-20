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
}

export const navbarRoutes = {
    other:[
        { title: "Home", url: "/" },
        { title: "Discover", url: Routes.ProductsListingPage },
    ],
    auth: {
        login: { title: "Login", url: Routes.AuthLoginPage },
        signup: { title: "Sign up", url: Routes.AuthRegisterPage },
        addtoCart: { title: "Add to Cart", url: Routes.CartPage },
        wishlist: { title: "Wishlist", url: Routes.WishListPage },
    },
}