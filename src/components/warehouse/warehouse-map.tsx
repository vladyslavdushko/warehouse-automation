"use client";

import { useQuery } from "@tanstack/react-query";
import { useDatabase } from "@/hooks/useDatabase";
import { useMemo } from "react";
import { STORE_NAMES } from "@/lib/db/schema";

interface WarehouseLayout {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  type: 'SHELF' | 'AISLE' | 'ENTRY' | 'EXIT';
  capacity: number | null;
  currentLoad: number;
}

interface Product {
  id: string;
  name: string;
  locationId: string;
}

const typeColors = {
  SHELF: "bg-blue-200",
  AISLE: "bg-gray-200",
  ENTRY: "bg-green-200",
  EXIT: "bg-red-200",
} as const;

export function WarehouseMap() {
  const { db, isLoading: dbLoading } = useDatabase();

  const { data: layouts, isLoading } = useQuery({
    queryKey: ["warehouseLayout"],
    queryFn: async () => {
      if (!db) return [];
      return await db.getAll(STORE_NAMES.WAREHOUSE_LAYOUT) as WarehouseLayout[];
    },
    enabled: !!db,
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!db) return [];
      return await db.getAll(STORE_NAMES.PRODUCTS) as Product[];
    },
    enabled: !!db,
  });

  const layoutWithProducts = useMemo(() => {
    if (!layouts || !products) return [];
    return layouts.map((item: WarehouseLayout) => {
      const productsInLocation = products.filter(
        (product: Product) => product.locationId === item.id
      );
      return {
        ...item,
        products: productsInLocation,
      };
    });
  }, [layouts, products]);

  if (dbLoading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-10 gap-1 p-4">
      {layoutWithProducts.map((item: WarehouseLayout & { products: Product[] }) => (
        <div
          key={item.id}
          className={`p-2 rounded ${typeColors[item.type]} relative`}
          style={{
            gridColumn: item.coordinates.x + 1,
            gridRow: item.coordinates.y + 1,
          }}
        >
          <div className="text-sm font-medium">{item.name}</div>
          <div className="text-xs">
            {item.products.length} items
          </div>
        </div>
      ))}
    </div>
  );
} 