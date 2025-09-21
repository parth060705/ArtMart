import { User, Box, Home, ShoppingCart, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/user/auth/UseAuth";
import { toast } from 'sonner';
import { Routes } from '@/lib/routes';
import { Button } from "@/components/ui/button";
import { navbarRoutes } from "@/lib/routes";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  }
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Auroraa",
  },
}: NavbarProps) => {
  const { isAuthenticated, username, userProfile } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <div className="">
      {/* Instagram/Pinterest-like Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[15vw] border-r border-gray-200 dark:border-gray-800 bg-background p-4 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="px-4 py-6">
          <a href={logo.url} className="flex items-center gap-2">
            <span className="text-2xl font-bold logo-font bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {logo.title}
            </span>
          </a>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {navbarRoutes.other.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors ${window.location.pathname === item.url ? 'font-semibold text-primary' : ''}`}
            >
              {item.icon && <item.icon className="w-6 h-6 mr-4" />}
              <span className="text-base">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section - User & Settings */}
        <div className="mt-auto pb-6">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                to={`/me/profile/${username}`}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img
                  src={userProfile?.profileImage || '/default-avatar.png'}
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-4 object-cover"
                />
                <span className="text-base">Profile</span>
              </Link>
              {/* <Link
                to={navbarRoutes.auth.addtoCart.url}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 mr-4" />
                <span className="text-base">Cart</span>
              </Link> */}
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-3 h-auto text-base"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2 px-4">
              <Button asChild className="w-full">
                <a href={navbarRoutes.auth.login.url}>Log In</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={navbarRoutes.auth.signup.url}>Sign Up</a>
              </Button>
            </div>
          )}

          {/* Theme Toggle */}
          <div className="mt-4 px-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="block lg:hidden">
        {/* Bottom nav bar for mobile */}
        <div className="fixed bottom-0 left-0 w-full bg-background border-t border-gray-200 z-50 shadow-md">
          <div className="flex justify-between items-center px-6 py-2 relative">

            {/* Home */}
            <Link
              to="/"
              className={`flex flex-col items-center text-sm ${window.location.pathname === '/' ? 'text-primary' : 'text-foreground'}`}
            >
              <Home className="w-6 h-6 mb-1" />
              Home
            </Link>

            {/* Products */}
            <Link
              to="/products"
              className={`flex flex-col items-center text-sm ${window.location.pathname === '/products' ? 'text-primary' : 'text-foreground'}`}
            >
              <Box className="w-6 h-6 mb-1" />
              Discover
            </Link>


            {/* Cart */}
            <Link
              to={navbarRoutes.auth.wishlist.url}
              className="flex flex-col items-center text-sm ${window.location.pathname === '/' ? 'text-primary' : 'text-foreground"
            >
              <Bookmark className="w-6 h-6 mb-1" />
              Artists
            </Link>

            {/* Create Button */}
            <Link
              to={`/${Routes.UploadProductPage}`}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-xl font-bold"
            >
              +
            </Link>

            {/* Profile */}
            <Link
              to={isAuthenticated ? `/me/profile/${username}` : Routes.AuthLoginPage}
              className={`flex flex-col items-center text-sm ${window.location.pathname.startsWith('/profile') ? 'text-primary' : 'text-foreground'
                }`}
            >
              {isAuthenticated && userProfile?.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-7 h-7 rounded-full border-2 border-[var(--primary)] object-cover mb-1"
                />
              ) : (
                <User className="w-6 h-6 mb-1" />
              )}
              Profile
            </Link>
          </div>
        </div>

        {/* Filter Sidebar Drawer */}
        {/* <Sheet open={openFilter} onOpenChange={setOpenFilter}>
            <SheetContent side="right" className="max-w-xs w-full">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </SheetContent>
          </Sheet> */}
      </div>

    </div>
  );
};

export default Navbar;
