import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { sql } from "drizzle-orm";
import { warehouseLayout, products, inventoryMovements } from "./schema";

// Initialize SQLite database
const sqlite = new Database("warehouse.db");
const db = drizzle(sqlite);

// Function to initialize database with sample data
export async function initializeDatabase() {
  // Create tables if they don't exist
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS warehouseLayout (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      type TEXT NOT NULL,
      capacity INTEGER,
      currentLoad INTEGER DEFAULT 0
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      description TEXT,
      quantity INTEGER NOT NULL DEFAULT 0,
      locationId TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (locationId) REFERENCES warehouseLayout(id)
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS inventoryMovements (
      id TEXT PRIMARY KEY,
      productId TEXT NOT NULL,
      fromLocationId TEXT,
      toLocationId TEXT,
      quantity INTEGER NOT NULL,
      type TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id),
      FOREIGN KEY (fromLocationId) REFERENCES warehouseLayout(id),
      FOREIGN KEY (toLocationId) REFERENCES warehouseLayout(id)
    )
  `);

  // Insert sample warehouse layout data if the table is empty
  const layoutCount = await db.select({ count: sql<number>`count(*)` }).from(warehouseLayout);
  if (layoutCount[0].count === 0) {
    await db.insert(warehouseLayout).values([
      {
        id: "entrance",
        name: "Main Entrance",
        x: 0,
        y: 0,
        type: "entrance",
        capacity: null,
        currentLoad: 0,
      },
      {
        id: "exit",
        name: "Main Exit",
        x: 100,
        y: 0,
        type: "exit",
        capacity: null,
        currentLoad: 0,
      },
      {
        id: "shelf1",
        name: "Shelf A1",
        x: 20,
        y: 20,
        type: "shelf",
        capacity: 100,
        currentLoad: 0,
      },
      {
        id: "shelf2",
        name: "Shelf A2",
        x: 20,
        y: 40,
        type: "shelf",
        capacity: 100,
        currentLoad: 0,
      },
      {
        id: "aisle1",
        name: "Main Aisle",
        x: 10,
        y: 30,
        type: "aisle",
        capacity: null,
        currentLoad: 0,
      },
    ]);
  }
}

export { db }; 