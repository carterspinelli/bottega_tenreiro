import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertConsultationRequestSchema } from "@shared/schema";

interface SessionRequest extends Request {
  sessionID?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Fabrics
  app.get("/api/fabrics", async (req, res) => {
    try {
      const fabrics = await storage.getFabrics();
      res.json(fabrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fabrics" });
    }
  });

  app.get("/api/fabrics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const fabric = await storage.getFabric(id);
      
      if (!fabric) {
        return res.status(404).json({ message: "Fabric not found" });
      }
      
      res.json(fabric);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fabric" });
    }
  });

  // Collections
  app.get("/api/collections", async (req, res) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collections" });
    }
  });

  // Cart
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as SessionRequest).sessionID || "anonymous";
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as SessionRequest).sessionID || "anonymous";
      const cartItemData = { ...req.body, sessionId };
      
      const validatedData = insertCartItemSchema.parse(cartItemData);
      const cartItem = await storage.addCartItem(validatedData);
      
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to add item to cart" });
      }
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const cartItem = await storage.updateCartItem(id, updates);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeCartItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as SessionRequest).sessionID || "anonymous";
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Consultation Requests
  app.post("/api/consultation", async (req, res) => {
    try {
      const validatedData = insertConsultationRequestSchema.parse(req.body);
      const consultation = await storage.createConsultationRequest(validatedData);
      
      res.status(201).json(consultation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit consultation request" });
      }
    }
  });

  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultationRequests();
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch consultation requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
