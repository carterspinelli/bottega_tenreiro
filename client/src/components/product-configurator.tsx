import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Product, Fabric } from "@shared/schema";
import type { ConfiguratorState } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";

import _1_1 from "@assets/1-1.jpg";
import fabricSample from "@assets/fabric-sample.jpg";
import aBELIER_CANNES0398 from "@assets/aBELIER_CANNES0398.webp";

export function ProductConfigurator() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [configurator, setConfigurator] = useState<ConfiguratorState>({
    selectedSize: "M",
    selectedFabric: 1, // Default to Italian Cotton
    selectedCollar: "spread",
    selectedCuff: "barrel",
    totalPrice: 29500, // Base price in cents
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: fabrics } = useQuery<Fabric[]>({
    queryKey: ["/api/fabrics"],
  });

  const addToCartMutation = useMutation({
    mutationFn: (cartItem: any) => apiRequest("POST", "/api/cart", cartItem),
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: "Your bespoke shirt has been added to your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const shirtProduct = products?.find(p => p.category === "shirts");
  const selectedFabric = fabrics?.find(f => f.id === configurator.selectedFabric);

  useEffect(() => {
    if (shirtProduct && selectedFabric) {
      const totalPrice = shirtProduct.basePrice + selectedFabric.price;
      setConfigurator(prev => ({ ...prev, totalPrice }));
    }
  }, [shirtProduct, selectedFabric]);

  const sizes = [
    { value: "S", label: "S", chest: "36-38" },
    { value: "M", label: "M", chest: "40-42" },
    { value: "L", label: "L", chest: "44-46" },
    { value: "XL", label: "XL", chest: "48-50" },
  ];

  const collarStyles = [
    { value: "classic", label: "Classic" },
    { value: "spread", label: "Spread" },
    { value: "button-down", label: "Button Down" },
    { value: "italian", label: "Italian" },
  ];

  const cuffStyles = [
    { value: "barrel", label: "Barrel Cuff" },
    { value: "french", label: "French Cuff" },
    { value: "convertible", label: "Convertible" },
  ];

  const handleAddToCart = () => {
    if (!shirtProduct || !configurator.selectedFabric) {
      toast({
        title: "Configuration Required",
        description: "Please select all options before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      productId: shirtProduct.id,
      fabricId: configurator.selectedFabric,
      size: configurator.selectedSize,
      collarStyle: configurator.selectedCollar,
      cuffStyle: configurator.selectedCuff,
      quantity: 1,
      customizations: {
        collar: configurator.selectedCollar,
        cuff: configurator.selectedCuff,
      },
    };

    addToCartMutation.mutate(cartItem);
  };

  const formatPrice = (cents: number) => {
    return `€${(cents / 100).toFixed(0)}`;
  };

  if (!products || !fabrics || !shirtProduct) {
    return <div>Loading configurator...</div>;
  }

  return (
    <section id="bespoke" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Create Your Perfect Shirt
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Design your bespoke shirt with our intuitive configurator. 
            Every detail crafted to your exact specifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Preview */}
          <div className="relative">
            <img
              src={aBELIER_CANNES0398}
              alt="Bespoke shirt preview"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <Badge className="absolute top-4 right-4 bg-warm-gold text-charcoal">
              Made to Measure
            </Badge>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-8">
            <div>
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-2">
                {shirtProduct.name}
              </h3>
              <p className="text-gray-600 mb-4">{shirtProduct.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-charcoal">Size Selection</h4>
              <div className="grid grid-cols-4 gap-4">
                {sizes.map((size) => (
                  <Button
                    key={size.value}
                    variant={configurator.selectedSize === size.value ? "default" : "outline"}
                    className={`py-6 flex flex-col ${
                      configurator.selectedSize === size.value
                        ? "bg-warm-gold hover:bg-warm-gold/90 text-charcoal border-warm-gold"
                        : "border-gray-200 hover:border-warm-gold text-charcoal"
                    }`}
                    onClick={() => setConfigurator(prev => ({ ...prev, selectedSize: size.value }))}
                  >
                    <span className="font-semibold">{size.label}</span>
                    <span className="text-xs opacity-70">{size.chest}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Fabric Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-charcoal">Fabric Options</h4>
              <div className="grid grid-cols-2 gap-4">
                {fabrics.slice(0, 4).map((fabric) => (
                  <Card
                    key={fabric.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      configurator.selectedFabric === fabric.id
                        ? "border-warm-gold bg-warm-gold/5"
                        : "border-gray-200 hover:border-warm-gold"
                    }`}
                    onClick={() => setConfigurator(prev => ({ ...prev, selectedFabric: fabric.id }))}
                  >
                    <CardContent className="p-4">
                      <img
                        src={fabricSample}
                        alt={fabric.name}
                        className="w-full h-20 object-cover rounded-md mb-3"
                      />
                      <h5 className="font-medium text-sm text-charcoal">{fabric.name}</h5>
                      <p className="text-xs text-gray-500">
                        {fabric.price > 0 ? `+${formatPrice(fabric.price)}` : "Included"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Style Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-charcoal">Style Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Collar Style</label>
                  <Select
                    value={configurator.selectedCollar}
                    onValueChange={(value) => setConfigurator(prev => ({ ...prev, selectedCollar: value }))}
                  >
                    <SelectTrigger className="w-full border-gray-200 focus:border-warm-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {collarStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cuff Style</label>
                  <Select
                    value={configurator.selectedCuff}
                    onValueChange={(value) => setConfigurator(prev => ({ ...prev, selectedCuff: value }))}
                  >
                    <SelectTrigger className="w-full border-gray-200 focus:border-warm-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cuffStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-playfair font-bold text-charcoal">
                    {formatPrice(configurator.totalPrice)}
                  </span>
                  <span className="text-gray-500 ml-2">Made to measure</span>
                </div>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Estimated delivery: 3-4 weeks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
