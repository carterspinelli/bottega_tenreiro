import { Instagram, Facebook, Linkedin } from "lucide-react";
import bottegaLogo from "@assets/Bottega2.png";

export function Footer() {
  const collections = [
    "Made to Measure Shirts",
    "Bespoke Suits", 
    "Premium Trousers",
    "Luxury Accessories"
  ];

  const services = [
    "Size Guide",
    "Care Instructions", 
    "Alterations",
    "Returns & Exchanges"
  ];

  const legalLinks = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy"
  ];

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img 
              src={bottegaLogo} 
              alt="Bottega Tenreiro" 
              className="h-8 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed mb-6">
              Exclusive made-to-measure tailoring combining traditional craftsmanship 
              with contemporary elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-warm-gold transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-warm-gold transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-warm-gold transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-6">Collections</h4>
            <ul className="space-y-3">
              {collections.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-warm-gold transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-warm-gold transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Zapopan, México</li>
              <li>CDMX, México</li>
              <li>+39 02 123 4567</li>
              <li>info@bottegatenreiro.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Bottega Tenreiro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
