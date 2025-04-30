export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  quantity: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  productId: string;
  type: "IN" | "OUT";
  quantity: number;
  timestamp: Date;
  orderId?: string;
}

export interface WarehouseLayout {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  type: "SHELF" | "AISLE" | "ENTRY" | "EXIT";
  capacity?: number;
  currentLoad: number;
}

export interface Order {
  id: string;
  customer: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  createdAt: Date;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

// Store names
export const STORE_NAMES = {
  USERS: 'users',
  PRODUCTS: 'products',
  TRANSACTIONS: 'transactions',
  WAREHOUSE_LAYOUT: 'warehouseLayout',
  ORDERS: 'orders',
} as const; 