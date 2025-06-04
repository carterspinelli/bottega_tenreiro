export interface ConfiguratorState {
  selectedSize: string;
  selectedFabric: number | null;
  selectedCollar: string;
  selectedCuff: string;
  totalPrice: number;
}

export interface CartItem {
  id: number;
  productId: number;
  fabricId?: number;
  size: string;
  collarStyle?: string;
  cuffStyle?: string;
  quantity: number;
  customizations: Record<string, any>;
}

export interface ConsultationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceType?: string;
  message?: string;
}
