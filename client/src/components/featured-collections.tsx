import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@shared/schema";

export function FeaturedCollections() {
  const { data: collections, isLoading } = useQuery<Collection[]>({
    queryKey: ["/api/collections"],
  });

  const handleViewCollection = (category: string) => {
    // Implementation for viewing specific collection
    console.log("Viewing collection:", category);
  };

  if (isLoading) {
    return <div>Loading collections...</div>;
  }

  return (
    <section id="collections" className="py-20 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium garments, 
            each piece representing the pinnacle of sartorial excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {collections?.map((collection) => (
            <Card
              key={collection.id}
              className="group cursor-pointer bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onClick={() => handleViewCollection(collection.category)}
            >
              <div className="overflow-hidden">
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-3">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-charcoal">
                    {collection.priceRange}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-warm-gold hover:text-chocolate font-semibold p-0 h-auto"
                  >
                    View Collection
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
