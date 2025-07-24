import { Menu } from "lucide-react";
import ProductSearchBar from "@/components/ProductSearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/UseAuth";
import { toast } from 'sonner';
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
import { useProductSearch } from "@/context/ProductSearchContext";
import { Routes as AppRoutes } from "@/lib/routes";
interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  }
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Artmart",
  },
}: NavbarProps) => {
  const { isAuthenticated, username, userProfile } = useAuth();
  const { setSearchQuery } = useProductSearch();
  // Search/filter state for Product Listing Page
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  console.log(search)

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <section className="p-4 border-b border-gray-200">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex items-center">
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

          {/* Search and Filter for Product Listing Page */}
          {typeof window !== 'undefined' && window.location.pathname.includes(AppRoutes.ProductsListingPage) || window.location.pathname.includes(AppRoutes.SearchProductPage) && (
            <div className="flex items-center gap-3 mr-6">
              <ProductSearchBar value={search} onChange={setSearchQuery} />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-full px-6 font-semibold border-[var(--primary)] text-[var(--primary)] ml-2">
                    Filters
                  </Button>
                </SheetTrigger>
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
              </Sheet>
            </div>
          )}
          <div className="flex gap-2">
            {/* Theme Switcher Button (Desktop) */}
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
              {/* User Avatar Link */}
              {isAuthenticated && (
                <Link to={`/profile/${username}`} className="ml-2" aria-label="Go to profile">
                  <img
                    src={`${userProfile?.profileImage}`}
                    alt="Go to profile"
                    className="w-10 h-10 rounded-full border-2 border-[var(--primary)] object-cover shadow hover:scale-105 transition-transform"
                  />
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <span className="text-xl logo-font bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
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
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
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
                    {/* User Avatar Link (Mobile) */}
                    {isAuthenticated && (
                      <Link to={`/profile/${username}`} className="self-center mt-2" aria-label="Go to profile">
                        <img
                          src={`${userProfile?.profileImage}`}
                          alt="Go to profile"
                          className="w-12 h-12 rounded-full border-2 border-[var(--primary)] object-cover shadow hover:scale-105 transition-transform"
                        />
                      </Link>
                    )}
                  </div>
                  {/* Theme Switcher Button (Mobile) */}
                  {/* <ThemeSwitcher /> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}


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
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
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
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export default Navbar;