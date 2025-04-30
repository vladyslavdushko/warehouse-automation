import { NextResponse } from 'next/server';
import { openDB } from 'idb';

// Initialize IndexedDB
const db = await openDB('warehouse-db', 1, {
  upgrade(db) {
    // Create object stores for different entities
    const inventoryStore = db.createObjectStore('inventory', { keyPath: 'id' });
    inventoryStore.createIndex('sku', 'sku', { unique: true });
    
    const ordersStore = db.createObjectStore('orders', { keyPath: 'id' });
    ordersStore.createIndex('status', 'status');
    
    const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' });
    transactionsStore.createIndex('orderId', 'orderId');
  },
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const store = searchParams.get('store');
  
  try {
    switch (action) {
      case 'getAll':
        const data = await db.getAll(store || 'inventory');
        return NextResponse.json({ data });
        
      case 'getById':
        const id = searchParams.get('id');
        if (!id) throw new Error('ID is required');
        const item = await db.get(store || 'inventory', id);
        return NextResponse.json({ data: item });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { store, data } = await request.json();
  
  try {
    const id = await db.add(store || 'inventory', data);
    return NextResponse.json({ id });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { store, id, data } = await request.json();
  
  try {
    await db.put(store || 'inventory', data, id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const store = searchParams.get('store');
  const id = searchParams.get('id');
  
  try {
    if (!id) throw new Error('ID is required');
    await db.delete(store || 'inventory', id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'An error occurred' }, { status: 500 });
  }
} 