import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp" }),
  image: text("image"),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  sku: text("sku").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull().default(0),
  reorderThreshold: integer("reorderThreshold").notNull().default(10),
  location: text("location"),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  productId: text("productId").notNull().references(() => products.id),
  type: text("type", { enum: ["IN", "OUT"] }).notNull(),
  quantity: integer("quantity").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  notes: text("notes"),
});

export const warehouseLayout = sqliteTable("warehouseLayout", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  coordinates: text("coordinates").notNull(), // JSON string of {x, y} coordinates
  type: text("type", { enum: ["SHELF", "AISLE", "ENTRY", "EXIT"] }).notNull(),
  capacity: integer("capacity"),
  currentLoad: integer("currentLoad").default(0),
}); 