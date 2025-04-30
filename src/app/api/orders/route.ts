import { NextResponse } from 'next/server';
import db from '@/lib/db/server';

export async function GET() {
  try {
    const orders = db.prepare(`
      SELECT o.*, 
             COALESCE(SUM(oi.quantity * oi.price), 0) as total_amount
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `).all();

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { customer, total_amount, status } = await request.json();

    const result = db.prepare(`
      INSERT INTO orders (customer, status, total_amount, created_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `).run(customer, status, total_amount);

    return NextResponse.json(
      { id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 