import { openDB } from 'idb';
import { STORE_NAMES } from './schema';

export const db = await openDB('warehouse-db', 1, {
  upgrade(db) {
    // Users store
    const usersStore = db.createObjectStore(STORE_NAMES.USERS, { keyPath: 'id' });
    usersStore.createIndex('email', 'email', { unique: true });
    
    // Products store
    const productsStore = db.createObjectStore(STORE_NAMES.PRODUCTS, { keyPath: 'id' });
    productsStore.createIndex('sku', 'sku', { unique: true });
    productsStore.createIndex('location', 'location');
    
    // Transactions store
    const transactionsStore = db.createObjectStore(STORE_NAMES.TRANSACTIONS, { keyPath: 'id' });
    transactionsStore.createIndex('productId', 'productId');
    transactionsStore.createIndex('timestamp', 'timestamp');
    
    // Warehouse layout store
    const warehouseLayoutStore = db.createObjectStore(STORE_NAMES.WAREHOUSE_LAYOUT, { keyPath: 'id' });
    warehouseLayoutStore.createIndex('type', 'type');
  },
});

// Helper functions for database operations
export async function addUser(user: any) {
  return await db.add(STORE_NAMES.USERS, user);
}

export async function getUserByEmail(email: string) {
  return await db.getFromIndex(STORE_NAMES.USERS, 'email', email);
}

export async function addProduct(product: any) {
  return await db.add(STORE_NAMES.PRODUCTS, product);
}

export async function getProductBySku(sku: string) {
  return await db.getFromIndex(STORE_NAMES.PRODUCTS, 'sku', sku);
}

export async function getProductsByLocation(location: string) {
  return await db.getAllFromIndex(STORE_NAMES.PRODUCTS, 'location', location);
}

export async function addTransaction(transaction: any) {
  return await db.add(STORE_NAMES.TRANSACTIONS, transaction);
}

export async function getTransactionsByProductId(productId: string) {
  return await db.getAllFromIndex(STORE_NAMES.TRANSACTIONS, 'productId', productId);
}

export async function addWarehouseLayout(layout: any) {
  return await db.add(STORE_NAMES.WAREHOUSE_LAYOUT, layout);
}

export async function getWarehouseLayoutByType(type: string) {
  return await db.getAllFromIndex(STORE_NAMES.WAREHOUSE_LAYOUT, 'type', type);
} 