import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import bottegaLogo from "@assets/Bottega.png";

export function Navigation() {
  const [location] = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "#collections", label: "Collections" },
    { href: "#bespoke", label: "Made to Measure" },
    { href: "#craftsmanship", label: "Craftsmanship" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-chocolate/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-[#ffffff]">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img 
                src={bottegaLogo} 
                alt="Bottega Tenreiro" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-charcoal hover:text-chocolate transition-colors font-medium text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-charcoal hover:text-chocolate">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-charcoal hover:text-chocolate">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-charcoal hover:text-chocolate relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-chocolate text-cream text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-charcoal hover:text-chocolate">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-cream">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-lg font-medium text-charcoal hover:text-chocolate transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
