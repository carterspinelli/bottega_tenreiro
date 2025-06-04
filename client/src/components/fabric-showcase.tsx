import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Fabric } from "@shared/schema";

export function FabricShowcase() {
  const { data: fabrics, isLoading } = useQuery<Fabric[]>({
    queryKey: ["/api/fabrics"],
  });

  if (isLoading) {
    return <div>Loading fabrics...</div>;
  }

  const featuredFabrics = fabrics?.slice(0, 6) || [];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Exceptional Fabrics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We source only the finest materials from renowned mills across Europe, 
            ensuring every garment meets our exacting standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredFabrics.map((fabric) => (
            <Card key={fabric.id} className="group text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="overflow-hidden rounded-2xl mb-6">
                  <img
                    src={fabric.imageUrl}
                    alt={fabric.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                  {fabric.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {fabric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
