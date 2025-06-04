import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProductConfigurator } from "@/components/product-configurator";
import { FeaturedCollections } from "@/components/featured-collections";
import { FabricShowcase } from "@/components/fabric-showcase";
import { CraftsmanshipSection } from "@/components/craftsmanship-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main>
        <HeroSection />
        <ProductConfigurator />
        <FeaturedCollections />
        <FabricShowcase />
        <CraftsmanshipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
