import { Database } from "better-sqlite3";

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

export interface WarehouseZone {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface WarehouseLocation {
  id: number;
  zone_id: number;
  name: string;
  row: number;
  column: number;
  max_capacity: number;
  current_capacity: number;
  created_at: string;
}

// Store names
export const STORE_NAMES = {
  USERS: 'users',
  PRODUCTS: 'products',
  TRANSACTIONS: 'transactions',
  WAREHOUSE_LAYOUT: 'warehouseLayout',
  ORDERS: 'orders',
} as const;

export function createTables(db: Database) {
  // ... existing tables ...

  // Create warehouse zones table
  db.exec(`
    CREATE TABLE IF NOT EXISTS warehouse_zones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create warehouse locations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS warehouse_locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zone_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      row INTEGER NOT NULL,
      column INTEGER NOT NULL,
      max_capacity INTEGER NOT NULL,
      current_capacity INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (zone_id) REFERENCES warehouse_zones(id)
    )
  `);

  // ... existing code ...
} 