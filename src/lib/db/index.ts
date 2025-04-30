import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import * as schema from "./schema";

const sqlite = new Database("warehouse.db");
export const db = drizzle(sqlite, { schema });

// Initialize database with tables if they don't exist
export async function initializeDatabase() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      emailVerified INTEGER,
      image TEXT
    );
    
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER NOT NULL DEFAULT 0,
      reorderThreshold INTEGER NOT NULL DEFAULT 10,
      location TEXT,
      createdAt INTEGER DEFAULT CURRENT_TIMESTAMP,
      updatedAt INTEGER DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      type TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      timestamp INTEGER DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      FOREIGN KEY (productId) REFERENCES products(id)
    );
    
    CREATE TABLE IF NOT EXISTS warehouseLayout (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      coordinates TEXT NOT NULL,
      type TEXT NOT NULL,
      capacity INTEGER,
      currentLoad INTEGER DEFAULT 0
    );
  `);
} 