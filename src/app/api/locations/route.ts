import { NextResponse } from "next/server";
import db from "@/lib/db/server";
import { WarehouseLocation } from "@/lib/db/schema";

export async function GET() {
  try {
    const locations = db.prepare(`
      SELECT l.*, z.name as zone_name 
      FROM warehouse_locations l
      JOIN warehouse_zones z ON l.zone_id = z.id
    `).all();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { zone_id, name, row, column, max_capacity } = data;

    if (!zone_id || !name || row === undefined || column === undefined || !max_capacity) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const result = db
      .prepare(
        `INSERT INTO warehouse_locations 
        (zone_id, name, row, column, max_capacity) 
        VALUES (?, ?, ?, ?, ?)`
      )
      .run(zone_id, name, row, column, max_capacity);

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json({ error: "Failed to create location" }, { status: 500 });
  }
} 