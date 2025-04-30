import { sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const warehouseLayout = sqliteTable("warehouse_layout", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  coordinates: text("coordinates").notNull(), // Stored as JSON string {x: number, y: number}
  type: text("type", { enum: ["SHELF", "AISLE", "ENTRY", "EXIT"] }).notNull(),
  capacity: integer("capacity").notNull(),
  currentLoad: integer("current_load").notNull().default(0),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  location: text("location").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const inventoryMovements = sqliteTable("inventory_movements", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull(),
  fromLocation: text("from_location"),
  toLocation: text("to_location").notNull(),
  quantity: integer("quantity").notNull(),
  type: text("type", { enum: ["IN", "OUT", "TRANSFER"] }).notNull(),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
}); 