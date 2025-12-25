import { User, Box, Home, ShoppingCart, Bookmark, MessageCircleCode, MessageCircleIcon, Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/user/auth/UseAuth";
import { toast } from 'sonner';
import { Routes } from '@/lib/routes';
import { Button } from "@/components/ui/button";
import { navbarRoutes } from "@/lib/routes";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import profilePlaceHolderImage from '@/assets/placeholder-profile-image.jpg';
import { Plus } from 'lucide-react';

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
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = /^\/chat\/[^/]+$/.test(location.pathname);
  const isProfilePage = /^\/profile\/[^/]+$/.test(location.pathname);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate(`/me/profile/${username}`);
    } else {
      navigate(Routes.AuthLoginPage, {
        state: { from: Routes.ProfilePage },
        replace: true
      });
    }
  };

  return (
    <div className="">

      {/* mobile header  */}
      {location.pathname !== Routes.AuthLoginPage && location.pathname !== Routes.AuthRegisterPage && !isChatPage && !isProfilePage &&  <div>
        {/* <div className="px-4 py-6 md:hidden flex justify-between items-center">
          <Link to={logo.url} className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {logo.title}
          </Link>
          <div className="relative">
            <Link to={Routes.ChatPage}>
              <MessageCircleIcon className="w-6 h-6" />
            </Link>!isProfilePage &&  */}
            {/* <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
              3
            </Badge> */}
          {/* </div>
        </div> */}
      </div>}

      {/* Instagram/Pinterest-like Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[15vw] border-r border-gray-200 dark:border-gray-800 bg-background p-4 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="px-4 py-6">
          {/* <Link to={logo.url} className="text-2xl font-bold logo-font bg-gradient-to-r from-[#00bf99] to-[#612cd4] bg-clip-text text-transparent pl-6"> */}
          <Link to={logo.url} className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pl-6">
            {logo.title}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          {navbarRoutes.other.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center px-4 py-3 rounded-lg text-foreground hover:bg-muted/50 transition-colors ${window.location.pathname === item.url ? 'font-semibold text-accent' : ''}`}
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
                  src={userProfile?.profileImage || profilePlaceHolderImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[var(--accent)] mr-4 object-cover"
                />
                <span className="text-base">Profile</span>
              </Link>
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
          <div className="mt-4">
            <Link to={Routes.TermsAndConditionsPage}>
              <Button variant="ghost" size="sm">Terms & Conditions</Button>
            </Link>
            <Link to={Routes.PrivacyPolicyPage}>
              <Button variant="ghost" size="sm">Privacy Policy</Button>
            </Link>
          </div>
        </div>
      </div>
      
 {/* Mobile Bottom Navigation */}
        {!isChatPage && (
          <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden">
            <div className="mx-auto w-[85%] max-w-md">
              <div className="relative flex items-center justify-between bg-background/95 backdrop-blur-md shadow-xl rounded-full px-6 py-3">

                {/* Home */}
                <Link
                  to="/"
                  className={`flex flex-col items-center text-xs transition-colors ${location.pathname === '/' ? 'text-accent' : 'text-muted-foreground'
                    }`}
                >
                  <Home className="w-5 h-5 mb-0.5" />
                  Home
                </Link>

                {/* Discover */}
                <Link
                  to="/products"
                  className={`flex flex-col items-center text-xs transition-colors ${location.pathname === '/products'
                      ? 'text-accent'
                      : 'text-muted-foreground'
                    }`}
                >
                  <Search className="w-6 h-6 mb-0.5" />
                  Search
                </Link>

                {/* Floating Create Button */}
                <Link
                  to={`/${Routes.UploadProductPage}`}
                  className="absolute left-1/2 -top-4 -translate-x-1/2"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                </Link>

                {/* Artists */}
                <Link
                  to={Routes.ArtistsRankingPage}
                  className={`flex flex-col items-center text-xs transition-colors ${location.pathname === Routes.ArtistsRankingPage
                      ? 'text-accent'
                      : 'text-muted-foreground'
                    }`}
                >
                  <Users className="w-5 h-5 mb-0.5" />
                  Artists
                </Link>

                {/* Profile */}
                <button
                  onClick={handleProfileClick}
                  className={`flex flex-col items-center text-xs transition-colors ${location.pathname.startsWith('/profile')
                      ? 'text-accent'
                      : 'text-muted-foreground'
                    }`}
                >
                  <img
                    src={userProfile?.profileImage || profilePlaceHolderImage}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover border border-accent mb-0.5"
                  />
                  Profile
                </button>

              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default Navbar;
