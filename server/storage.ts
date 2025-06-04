import { 
  products, 
  fabrics, 
  collections, 
  cartItems, 
  consultationRequests,
  type Product, 
  type InsertProduct,
  type Fabric,
  type InsertFabric,
  type Collection,
  type InsertCollection,
  type CartItem,
  type InsertCartItem,
  type ConsultationRequest,
  type InsertConsultationRequest
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Fabrics
  getFabrics(): Promise<Fabric[]>;
  getFabric(id: number): Promise<Fabric | undefined>;
  getFabricsByCategory(category: string): Promise<Fabric[]>;
  createFabric(fabric: InsertFabric): Promise<Fabric>;

  // Collections
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;

  // Consultations
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private fabrics: Map<number, Fabric>;
  private collections: Map<number, Collection>;
  private cartItems: Map<number, CartItem>;
  private consultationRequests: Map<number, ConsultationRequest>;
  private currentProductId: number;
  private currentFabricId: number;
  private currentCollectionId: number;
  private currentCartItemId: number;
  private currentConsultationId: number;

  constructor() {
    this.products = new Map();
    this.fabrics = new Map();
    this.collections = new Map();
    this.cartItems = new Map();
    this.consultationRequests = new Map();
    this.currentProductId = 1;
    this.currentFabricId = 1;
    this.currentCollectionId = 1;
    this.currentCartItemId = 1;
    this.currentConsultationId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed Fabrics
    const fabrics: InsertFabric[] = [
      {
        name: "Italian Cotton",
        description: "Premium 100% cotton from Biella mills",
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
        category: "cotton",
        isActive: true
      },
      {
        name: "Egyptian Cotton",
        description: "Extra-long staple cotton for superior comfort",
        price: 5000,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
        category: "cotton",
        isActive: true
      },
      {
        name: "Premium Linen",
        description: "Lightweight linen blend for summer comfort",
        price: 8000,
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
        category: "linen",
        isActive: true
      },
      {
        name: "Mulberry Silk",
        description: "Grade A silk with natural sheen",
        price: 15000,
        imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
        category: "silk",
        isActive: true
      },
      {
        name: "Super 150s Wool",
        description: "Finest merino wool from New Zealand",
        price: 12000,
        imageUrl: "https://pixabay.com/get/gd579a4e7c604bce3f4ac2e826ff319580dc04ae901414e2490511374de5000b4efeb68fee28d441377015313d8308cfa7a8614579a9a94ff8f92bcb4b40ebc55_1280.jpg",
        category: "wool",
        isActive: true
      },
      {
        name: "Cashmere Blend",
        description: "Luxury cashmere and wool blend",
        price: 20000,
        imageUrl: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120",
        category: "wool",
        isActive: true
      }
    ];

    fabrics.forEach(fabric => this.createFabric(fabric));

    // Seed Products
    const products: InsertProduct[] = [
      {
        name: "Classic Dress Shirt",
        category: "shirts",
        description: "Timeless elegance meets modern comfort in our signature dress shirt",
        basePrice: 29500,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"],
        isActive: true
      },
      {
        name: "Business Casual Shirt",
        category: "shirts",
        description: "Perfect for the modern professional",
        basePrice: 24500,
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isActive: true
      },
      {
        name: "Tailored Trousers",
        category: "trousers",
        description: "Impeccably tailored trousers for every occasion",
        basePrice: 35000,
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isActive: true
      },
      {
        name: "Luxury Accessories",
        category: "accessories",
        description: "Exquisite finishing touches for the discerning gentleman",
        basePrice: 12500,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        isActive: true
      }
    ];

    products.forEach(product => this.createProduct(product));

    // Seed Collections
    const collections: InsertCollection[] = [
      {
        name: "Premium Shirts",
        description: "Handcrafted dress shirts using the finest Italian fabrics",
        imageUrl: "/attached_assets/bottega_ph.png",
        priceRange: "From $295",
        category: "shirts",
        isActive: true
      },
      {
        name: "Bespoke Trousers",
        description: "Perfectly tailored trousers crafted from premium wool",
        imageUrl: "/attached_assets/bottega_ph.png",
        priceRange: "From $350",
        category: "trousers",
        isActive: true
      },
      {
        name: "Premium Accessories",
        description: "Exquisite accessories to complete your sartorial wardrobe",
        imageUrl: "/attached_assets/bottega_ph.png",
        priceRange: "From $125",
        category: "accessories",
        isActive: true
      }
    ];

    collections.forEach(collection => this.createCollection(collection));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isActive);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category && p.isActive);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getFabrics(): Promise<Fabric[]> {
    return Array.from(this.fabrics.values()).filter(f => f.isActive);
  }

  async getFabric(id: number): Promise<Fabric | undefined> {
    return this.fabrics.get(id);
  }

  async getFabricsByCategory(category: string): Promise<Fabric[]> {
    return Array.from(this.fabrics.values()).filter(f => f.category === category && f.isActive);
  }

  async createFabric(insertFabric: InsertFabric): Promise<Fabric> {
    const id = this.currentFabricId++;
    const fabric: Fabric = { ...insertFabric, id };
    this.fabrics.set(id, fabric);
    return fabric;
  }

  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(c => c.isActive);
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.currentCollectionId++;
    const collection: Collection = { ...insertCollection, id };
    this.collections.set(id, collection);
    return collection;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, updates: Partial<CartItem>): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, ...updates };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId);
    
    itemsToRemove.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.currentConsultationId++;
    const request: ConsultationRequest = {
      ...insertRequest,
      id,
      createdAt: new Date().toISOString()
    };
    this.consultationRequests.set(id, request);
    return request;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }
}

export const storage = new MemStorage();
