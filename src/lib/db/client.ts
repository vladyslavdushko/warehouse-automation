import { openDB } from 'idb';
import { STORE_NAMES } from './schema';

let db: any = null;

export async function getDB() {
  if (!db) {
    db = await openDB('warehouse-db', 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          // Warehouse layout store
          const warehouseLayoutStore = db.createObjectStore(STORE_NAMES.WAREHOUSE_LAYOUT, { keyPath: 'id' });
          warehouseLayoutStore.createIndex('type', 'type');
          
          // Products store
          const productsStore = db.createObjectStore(STORE_NAMES.PRODUCTS, { keyPath: 'id' });
          productsStore.createIndex('sku', 'sku', { unique: true });
          productsStore.createIndex('locationId', 'locationId');
          
          // Inventory movements store
          const inventoryMovementsStore = db.createObjectStore('inventoryMovements', { keyPath: 'id' });
          inventoryMovementsStore.createIndex('productId', 'productId');
          inventoryMovementsStore.createIndex('fromLocationId', 'fromLocationId');
          inventoryMovementsStore.createIndex('toLocationId', 'toLocationId');
        }

        if (oldVersion < 2) {
          // Users store
          const usersStore = db.createObjectStore(STORE_NAMES.USERS, { keyPath: 'email' });
          usersStore.createIndex('id', 'id', { unique: true });
        }
      },
    });
  }
  return db;
}

// Function to initialize database with sample data
export async function initializeDatabase() {
  const db = await getDB();
  
  // Check if we already have data
  const layoutCount = await db.count(STORE_NAMES.WAREHOUSE_LAYOUT);
  
  if (layoutCount === 0) {
    // Insert sample warehouse layout data
    await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, {
      id: "entrance",
      name: "Main Entrance",
      coordinates: { x: 0, y: 0 },
      type: "ENTRY",
      capacity: null,
      currentLoad: 0,
    });
    
    await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, {
      id: "exit",
      name: "Main Exit",
      coordinates: { x: 10, y: 0 },
      type: "EXIT",
      capacity: null,
      currentLoad: 0,
    });
    
    await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, {
      id: "shelf1",
      name: "Shelf A1",
      coordinates: { x: 20, y: 20 },
      type: "SHELF",
      capacity: 100,
      currentLoad: 0,
    });
    
    await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, {
      id: "shelf2",
      name: "Shelf A2",
      coordinates: { x: 20, y: 40 },
      type: "SHELF",
      capacity: 100,
      currentLoad: 0,
    });
    
    await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, {
      id: "aisle1",
      name: "Main Aisle",
      coordinates: { x: 10, y: 30 },
      type: "AISLE",
      capacity: null,
      currentLoad: 0,
    });
  }
} 