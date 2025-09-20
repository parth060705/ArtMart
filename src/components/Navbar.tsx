import { User, Box, Home, Menu, ShoppingCart, Sliders, BookMarked, Bookmark } from "lucide-react";
import ProductSearchBar from "@/components/ProductSearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/user/auth/UseAuth";
import { toast } from 'sonner';
import { Routes } from '@/lib/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarRoutes } from "@/lib/routes";
import { MenuItem } from "@/lib/types";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useProductSearchContext } from "@/context/ProductSearchContext";
import { Routes as AppRoutes } from "@/lib/routes";

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
  const { setSearchQuery, searchQuery } = useProductSearchContext();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [openFilter, setOpenFilter] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <section className="p-3 bg-background shadow-sm top-0 z-50 border-b border-gray-50">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-xl logo-font bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {navbarRoutes.other.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <Link to={`/${Routes.UploadProductPage}`}>
            <Button variant="default" className="
    flex items-center justify-center gap-2 px-3.5 py-2
      bg-gradient-to-r from-primary to-accent
      text-white
      font-semibold text-lg
      rounded-full
      shadow-md
      transition-transform transform hover:scale-105 hover:shadow-xl
      active:scale-95
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
      w-full sm:w-auto
      z-10
      ">
              <span className="text-lg font-bold">+</span>
              Create
            </Button>
          </Link>

          {/* Search + Filter */}
          {typeof window !== 'undefined' &&
            (window.location.pathname.includes(AppRoutes.ProductsListingPage) ||
              window.location.pathname.includes(AppRoutes.SearchProductPage)) && (
              <div className="flex items-center gap-3 mr-6">
                <div className="relative w-full max-w-[300px] md:max-w-[400px]">
                  <ProductSearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  <button
                    onClick={() => setOpenFilter(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--primary)]"
                  >
                    <Sliders className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          {/* Auth / Cart / Theme */}
          <div className="flex gap-2 items-center">
            <div className="hidden lg:flex items-center ml-4">
              {/* <ThemeSwitcher /> */}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-3">
                {isAuthenticated ? (
                  <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button asChild variant="outline">
                      <a href={navbarRoutes.auth.login.url}>{navbarRoutes.auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={navbarRoutes.auth.signup.url}>{navbarRoutes.auth.signup.title}</a>
                    </Button>
                  </div>
                )}
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <Link
                    to={navbarRoutes.auth.addtoCart.url}
                    className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors relative"
                    aria-label="View cart"
                  >
                    <ShoppingCart className="w-5 h-5 text-[var(--foreground)]" />
                  </Link>
                  <Link to={`/me/profile/${username}`} aria-label="Go to profile">
                    <img
                      src={`${userProfile?.profileImage}`}
                      alt="Go to profile"
                      className="w-10 h-10 rounded-full border-2 border-[var(--primary)] object-cover shadow hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {/* Top Row: Logo + Burger */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between mt-2 px-2">
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-xl logo-font bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {navbarRoutes.other.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    {isAuthenticated ? (
                      <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <a href={navbarRoutes.auth.login.url}>{navbarRoutes.auth.login.title}</a>
                        </Button>
                        <Button asChild>
                          <a href={navbarRoutes.auth.signup.url}>{navbarRoutes.auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {typeof window !== 'undefined' &&
            (window.location.pathname.includes(AppRoutes.ProductsListingPage) ||
              window.location.pathname.includes(AppRoutes.SearchProductPage)) && (
              <div className="mt-3 px-2">
                <div className="relative w-full">
                  <ProductSearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  <button
                    onClick={() => setOpenFilter(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--primary)]"
                  >
                    <Sliders className="w-5 h-5" />
                  </button>
                </div>

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
            )}
        </div>

        {/* --------------------------------------------------- */}
        {/* Mobile Bottom Navigation */}
        <div className="block lg:hidden">
          {/* Bottom nav bar for mobile */}
          <div className="fixed bottom-0 left-0 w-full bg-background border-t border-gray-200 z-50 shadow-md">
            <div className="flex justify-between items-center px-6 py-2 relative">

              {/* Home */}
              <Link
                to={navbarRoutes.other?.home?.url || '/'}
                className={`flex flex-col items-center text-sm ${window.location.pathname === '/' ? 'text-primary' : 'text-foreground'
                  }`}
              >
                <Home className="w-6 h-6 mb-1" />
                Home
              </Link>

              {/* Products */}
              <Link
                to={navbarRoutes.other.ProductsListingPage?.url || '/products'}
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
                Saved
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
                to={isAuthenticated ? `/me/profile/${username}` : '/login'}
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

        {/* --------------------------------------------------- */}
      </div>
    </section>
  );
};

// Navigation helpers
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">{item.title}</a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
        )}
      </div>
    </a>
  );
};

export default Navbar;
