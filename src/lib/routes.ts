export class Routes {
    static ProductsListingPage = "products"
    static ProductDetailPage = "product"
    static CartPage = "cart"
    static ProfilePage = "profile/:username"
    static ProfileUpdatePage = "profile/:username/update"
    static UploadProductPage = "upload"
    static SearchProductPage = "search"
    static AuthLoginPage = "login"
    static AuthRegisterPage = "register"
    static AuthForgotPasswordPage = "forgot-password"
    static AuthResetPasswordPage = "reset-password"
}

export const navbarRoutes = {
    other:[
        { title: "Home", url: "/" },
        { title: "Products", url: Routes.ProductsListingPage },
    ],
    auth: {
        login: { title: "Login", url: Routes.AuthLoginPage },
        signup: { title: "Sign up", url: Routes.AuthRegisterPage },
    },
}