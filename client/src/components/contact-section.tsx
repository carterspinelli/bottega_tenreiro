import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ConsultationFormData } from "@/lib/types";

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ConsultationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const consultationMutation = useMutation({
    mutationFn: (data: ConsultationFormData) => apiRequest("POST", "/api/consultation", data),
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit consultation request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    consultationMutation.mutate(formData);
  };

  const handleChange = (field: keyof ConsultationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Visit Our Atelier
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the art of bespoke tailoring in our historic atelier. Schedule a private consultation to begin your sartorial journey.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <MapPin className="text-chocolate text-xl flex-shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal">Address</div>
                  <div className="text-gray-600">Zapopan, México</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-chocolate text-xl flex-shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal">Phone</div>
                  <div className="text-gray-600">+52 33 01 2345 6789</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="text-chocolate text-xl flex-shrink-0" />
                <div>
                  <div className="font-semibold text-charcoal">Email</div>
                  <div className="text-gray-600">info@bottegatenreiro.com</div>
                </div>
              </div>
            </div>

            <Button className="bg-chocolate hover:bg-chocolate/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105">
              Book Appointment
            </Button>
          </div>

          <Card className="bg-cream">
            <CardContent className="p-8">
              <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
                Request Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="border-gray-200 focus:border-chocolate"
                    required
                  />
                  <Input
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="border-gray-200 focus:border-chocolate"
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-gray-200 focus:border-chocolate"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-gray-200 focus:border-chocolate"
                />
                <Select value={formData.serviceType} onValueChange={(value) => handleChange("serviceType", value)}>
                  <SelectTrigger className="border-gray-200 focus:border-chocolate">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bespoke-shirt">Bespoke Shirt</SelectItem>
                    <SelectItem value="bespoke-suit">Bespoke Suit</SelectItem>
                    <SelectItem value="bespoke-trousers">Bespoke Trousers</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="border-gray-200 focus:border-chocolate resize-none"
                />
                <Button
                  type="submit"
                  disabled={consultationMutation.isPending}
                  className="w-full bg-chocolate hover:bg-chocolate/90 text-white py-3 rounded-lg font-medium transition-all duration-300"
                >
                  {consultationMutation.isPending ? "Sending..." : "Send Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
