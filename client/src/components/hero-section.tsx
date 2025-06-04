import { Button } from "@/components/ui/button";
import heroImage from "@assets/hero_bottega.jpg";

export function HeroSection() {
  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 z-10">
        <h1 className="font-playfair text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Avant-garde and exclusive<br />
          <span className="text-warm-gold">tailoring made to measure</span>
        </h1>
        <p className="text-xl lg:text-2xl mb-12 font-light leading-relaxed max-w-2xl mx-auto">
          Crafting exceptional garments with unparalleled attention to detail, 
          merging traditional craftsmanship with contemporary elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            onClick={() => scrollToSection("#bespoke")}
            className="bg-warm-gold hover:bg-warm-gold/90 text-charcoal px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Button>
          <Button 
            onClick={() => scrollToSection("#collections")}
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-charcoal px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            New Collection
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>
    </section>
  );
}
