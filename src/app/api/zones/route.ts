import { NextResponse } from "next/server";
import db from "@/lib/db/server";
import { WarehouseZone } from "@/lib/db/schema";

export async function GET() {
  try {
    const zones = db.prepare("SELECT * FROM warehouse_zones").all();
    return NextResponse.json(zones);
  } catch (error) {
    console.error("Error fetching zones:", error);
    return NextResponse.json({ error: "Failed to fetch zones" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description } = data;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = db
      .prepare(
        "INSERT INTO warehouse_zones (name, description) VALUES (?, ?)"
      )
      .run(name, description);

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error("Error creating zone:", error);
    return NextResponse.json({ error: "Failed to create zone" }, { status: 500 });
  }
} 