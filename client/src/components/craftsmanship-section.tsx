import { Scissors, Gem, Clock } from "lucide-react";

export function CraftsmanshipSection() {
  const features = [
    {
      icon: Scissors,
      title: "Hand-cut Patterns",
      description: "Each pattern is individually cut to ensure perfect fit and proportion",
    },
    {
      icon: Gem,
      title: "Premium Materials",
      description: "We source only the finest fabrics from renowned mills across Italy and England",
    },
    {
      icon: Clock,
      title: "Timeless Tradition",
      description: "Three generations of tailoring expertise passed down through our family atelier",
    },
  ];

  const images = [
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      alt: "Master tailor at work",
      className: "rounded-2xl shadow-lg",
    },
    {
      src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      alt: "Hand-stitched details",
      className: "rounded-2xl shadow-lg mt-8",
    },
    {
      src: "https://pixabay.com/get/g8e032afe879a87878475c581a39847c3dae5ec277e9e6afc1a1f5a7e5b31b3507f1e14360411b153bc0c4f2059090622a4151a2a3a9b2fde262ed1b6cab691df_1280.jpg",
      alt: "Fabric selection",
      className: "rounded-2xl shadow-lg -mt-8",
    },
    {
      src: "https://pixabay.com/get/ga664dc2abc891a3fdf78018ba3969317f5cea78d86a2c2280bd9935d32c0b7f02fd979d1122aa9e4e1947a305dcb83551c6cab62eb691fa4bc0925061992884a_1280.jpg",
      alt: "Finished garments",
      className: "rounded-2xl shadow-lg",
    },
  ];

  return (
    <section id="craftsmanship" className="py-20 lg:py-32 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-8">
              Artisanal <span className="text-warm-gold">Craftsmanship</span>
            </h2>
            <p className="text-xl leading-relaxed mb-8 text-gray-300">
              Every garment is meticulously handcrafted by master tailors with decades of experience. 
              From the initial measurements to the final stitch, we honor traditional techniques 
              while embracing innovative approaches.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-warm-gold/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <feature.icon className="w-6 h-6 text-warm-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={image.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
